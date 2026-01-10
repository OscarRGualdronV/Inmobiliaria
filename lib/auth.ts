import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'secret-key'

export async function login(email: string, password: string) {
  try {
    const vendedor = await prisma.vendedor.findUnique({
      where: { email }
    })

    if (!vendedor || !vendedor.activo) {
      return { error: 'Credenciales inválidas' }
    }

    const passwordMatch = await bcrypt.compare(password, vendedor.password)
    
    if (!passwordMatch) {
      return { error: 'Credenciales inválidas' }
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: vendedor.id, email: vendedor.email, nombre: vendedor.nombre },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Guardar en cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    return { success: true, vendedor }
  } catch (error) {
    console.error('Error en login:', error)
    return { error: 'Error en el servidor' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  redirect('/login')
}

export async function getCurrentVendedor() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number
      email: string
      nombre: string
    }

    const vendedor = await prisma.vendedor.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        whatsapp: true
      }
    })

    return vendedor
  } catch (error) {
    console.error('Error en getCurrentVendedor:', error)
    return null
  }
}

export async function requireAuth() {
  const vendedor = await getCurrentVendedor()
  
  if (!vendedor) {
    redirect('/login')
  }
  
  return vendedor
}