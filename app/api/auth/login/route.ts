import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'secret-key'

export async function POST(request: Request) {
  try {
    console.log('=== LOGIN API CALLED ===')
    const { email, password } = await request.json()
    
    console.log('Email recibido:', email)
    console.log('Password recibido:', password ? '***' : 'vacío')

    // Validar campos
    if (!email || !password) {
      console.log('ERROR: Campos vacíos')
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar vendedor
    const vendedor = await prisma.vendedor.findUnique({
      where: { email }
    })

    console.log('Vendedor encontrado:', vendedor ? 'SÍ' : 'NO')

    if (!vendedor) {
      console.log('ERROR: Vendedor no encontrado')
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    if (!vendedor.activo) {
      console.log('ERROR: Vendedor inactivo')
      return NextResponse.json(
        { error: 'Cuenta desactivada' },
        { status: 401 }
      )
    }

    // Verificar contraseña
    console.log('Comparando contraseñas...')
    const passwordMatch = await bcrypt.compare(password, vendedor.password)
    console.log('Contraseña coincide:', passwordMatch)
    
    if (!passwordMatch) {
      console.log('ERROR: Contraseña incorrecta')
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Crear token JWT
    console.log('Creando token JWT...')
    const token = jwt.sign(
      { 
        id: vendedor.id, 
        email: vendedor.email, 
        nombre: vendedor.nombre 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('Token creado exitosamente')

    // Crear respuesta
    const response = NextResponse.json({ 
      success: true, 
      vendedor: {
        id: vendedor.id,
        nombre: vendedor.nombre,
        email: vendedor.email,
        telefono: vendedor.telefono,
        whatsapp: vendedor.whatsapp
      }
    })

    // Configurar cookie
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Cambiar a 'lax' para desarrollo
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    console.log('Cookie configurada')
    console.log('=== LOGIN EXITOSO ===')

    return response

  } catch (error) {
    console.error('ERROR en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}