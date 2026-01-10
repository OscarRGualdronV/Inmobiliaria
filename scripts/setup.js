import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 CONFIGURACIÓN DEL SISTEMA INMOBILIARIO')
  console.log('='.repeat(50))
  
  try {
    console.log('\n📡 Conectando a la base de datos...')
    await prisma.$connect()
    console.log('✅ Conexión exitosa')
    
    // Crear solo un vendedor
    console.log('\n👤 Configurando vendedor único...')
    const vendedorEmail = 'vendedor@inmobiliaria.com'
    const vendedorPassword = 'Vendedor123!'
    const vendedorWhatsapp = '573001234567' // Cambia este número
    
    let vendedor = await prisma.vendedor.findUnique({
      where: { email: vendedorEmail }
    })
    
    if (!vendedor) {
      const hashedPassword = await hash(vendedorPassword, 12)
      vendedor = await prisma.vendedor.create({
        data: {
          nombre: 'Ana García - Vendedora',
          email: vendedorEmail,
          password: hashedPassword,
          telefono: '6012345678',
          whatsapp: vendedorWhatsapp
        }
      })
      console.log('✅ Vendedor creado exitosamente')
    } else {
      console.log('ℹ️  Vendedor ya existe')
    }
    
    // Crear algunos inmuebles de ejemplo
    console.log('\n🏠 Creando inmuebles de ejemplo...')
    const inmuebleCount = await prisma.inmueble.count()
    
    if (inmuebleCount === 0 && vendedor) {
      const inmueblesEjemplo = [
        {
          titulo: 'Hermosa Casa Campestre con Piscina',
          descripcion: 'Casa campestre ideal para descanso familiar. 4 habitaciones, 3 baños, piscina, jardín extenso y garaje para 2 vehículos.',
          tipo: 'CASA',
          precio: 1850000000,
          moneda: 'COP',
          area: 450,
          habitaciones: 4,
          banos: 3,
          pisos: 2,
          antiguedad: 5,
          estrato: 6,
          tieneGaraje: true,
          amoblado: true,
          direccion: 'Km 18 Vía Las Palmas',
          ciudad: 'Medellín',
          departamento: 'Antioquia',
          estado: 'DISPONIBLE',
          destacado: true,
          vendedorId: vendedor.id,
          imagenes: []
        },
        {
          titulo: 'Apartamento Moderno en Conjunto Cerrado',
          descripcion: 'Apartamento nuevo con acabados de lujo. 3 habitaciones, 2 baños, parqueadero cubierto, zona BBQ y gimnasio.',
          tipo: 'APARTAMENTO',
          precio: 720000000,
          moneda: 'COP',
          area: 95,
          habitaciones: 3,
          banos: 2,
          pisos: 12,
          antiguedad: 1,
          estrato: 5,
          tieneGaraje: true,
          amoblado: false,
          direccion: 'Carrera 50 # 120-30',
          ciudad: 'Bogotá',
          departamento: 'Cundinamarca',
          estado: 'DISPONIBLE',
          destacado: true,
          vendedorId: vendedor.id,
          imagenes: []
        },
        {
          titulo: 'Finca Productiva de 8 Hectáreas',
          descripcion: 'Predio rural con cultivos de café y aguacate. Casa de descanso, bodega, sistema de riego. Ideal para inversión.',
          tipo: 'PREDIO_RURAL',
          precio: 850000000,
          moneda: 'COP',
          area: 8,
          areaUnidad: 'HECTAREAS',
          direccion: 'Vereda La Esperanza',
          ciudad: 'Manizales',
          departamento: 'Caldas',
          estado: 'DISPONIBLE',
          vendedorId: vendedor.id,
          imagenes: [],
          topografia: 'ONDULADA',
          accesoAgua: true,
          accesoLuz: true,
          viaAcceso: 'DESTAPADA',
          cultivos: 'Café, Aguacate'
        }
      ]
      
      for (const inmueble of inmueblesEjemplo) {
        await prisma.inmueble.create({
          data: inmueble
        })
      }
      console.log(`✅ ${inmueblesEjemplo.length} inmuebles de ejemplo creados`)
    } else {
      console.log(`ℹ️  Ya existen ${inmuebleCount} inmuebles`)
    }
    
    console.log('\n' + '='.repeat(50))
    console.log('🎉 CONFIGURACIÓN COMPLETADA')
    console.log('='.repeat(50))
    
    console.log('\n🔑 CREDENCIALES DEL VENDEDOR:')
    console.log(`   Email: ${vendedorEmail}`)
    console.log(`   Contraseña: ${vendedorPassword}`)
    console.log(`   WhatsApp: https://wa.me/${vendedorWhatsapp}`)
    
    console.log('\n🔗 ENLACES:')
    console.log('   Página pública: http://localhost:3000')
    console.log('   Login vendedor: http://localhost:3000/login')
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message)
    process.exit(1)
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })