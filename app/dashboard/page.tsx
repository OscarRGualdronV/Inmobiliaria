import { redirect } from 'next/navigation'
import { getCurrentVendedor } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import DashboardStats from '@/components/dashboard/DashboardStats'
import InmueblesRecientes from '@/components/dashboard/InmueblesRecientes'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'

export default async function DashboardPage() {
  const vendedor = await getCurrentVendedor()

  // Si no hay vendedor autenticado, redirigir al login
  if (!vendedor) {
    redirect('/login')
  }

  // Obtener estadísticas
  const [
    totalInmuebles,
    inmueblesDisponibles,
    inmueblesVendidos,
    totalVistas
  ] = await Promise.all([
    prisma.inmueble.count({ where: { vendedorId: vendedor.id } }),
    prisma.inmueble.count({ 
      where: { 
        vendedorId: vendedor.id,
        estado: 'DISPONIBLE' 
      } 
    }),
    prisma.inmueble.count({ 
      where: { 
        vendedorId: vendedor.id,
        estado: 'VENDIDO' 
      } 
    }),
    prisma.inmueble.aggregate({
      where: { vendedorId: vendedor.id },
      _sum: { vistas: true }
    })
  ])

  // Obtener inmuebles recientes
  const inmueblesRecientes = await prisma.inmueble.findMany({
    where: { vendedorId: vendedor.id },
    take: 5,
    orderBy: { publicadoEn: 'desc' },
    select: {
      id: true,
      titulo: true,
      tipo: true,
      precio: true,
      ciudad: true,
      estado: true,
      publicadoEn: true,
      vistas: true
    }
  })

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido, {vendedor.nombre}!</h1>
            <p className="text-gray-600 mt-2">Panel de gestión de tus propiedades</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Quitamos el botón de WhatsApp aquí */}
            <Link 
              href="/dashboard/inmuebles/nuevo"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <PlusCircle size={20} className="mr-2" />
              Nuevo Inmueble
            </Link>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className=" text-[#000] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStats
          title="Total Inmuebles"
          value={totalInmuebles}
          icon="🏠"
          color="blue"
          description="Todas tus propiedades"
        />
        <DashboardStats
          title="En Venta"
          value={inmueblesDisponibles}
          icon="✅"
          color="green"
          description="Propiedades disponibles"
        />
        <DashboardStats
          title="Vendidos"
          value={inmueblesVendidos}
          icon="💰"
          color="purple"
          description="Propiedades vendidas"
        />
        <DashboardStats
          title="Vistas Totales"
          value={totalVistas._sum.vistas || 0}
          icon="👁️"
          color="orange"
          description="Total de visitas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inmuebles recientes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-[#000] text-lg font-semibold">Inmuebles Recientes</h2>
                <Link 
                  href="/dashboard/inmuebles"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ver todos →
                </Link>
              </div>
            </div>
            <InmueblesRecientes inmuebles={inmueblesRecientes} />
          </div>
        </div>

        {/* Información del vendedor */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className=" text-[#000] text-lg font-semibold mb-4">Tu Información de Contacto</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="  text-[#000] font-medium">{vendedor.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-[#000] font-medium">{vendedor.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-[#000] font-medium">{vendedor.telefono || 'No configurado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="text-[#000] font-medium">{vendedor.whatsapp || 'No configurado'}</p>
              <p className="text-xs text-gray-500 mt-1">
                Este número aparecerá en las propiedades para que los compradores te contacten
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <Link 
                href="/dashboard/configuracion"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Editar información de contacto →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas - Quitamos la tarjeta de WhatsApp */}
      <div className="mt-8">
        <h3 className=" text-[#000] text-lg font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/dashboard/inmuebles/nuevo"
            className="bg-white border border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <PlusCircle size={24} className="text-blue-600" />
              </div>
              <div>
                <h4 className=" text-[#000] font-semibold">Agregar Inmueble</h4>
                <p className="text-sm text-gray-600 mt-1">Publica una nueva propiedad</p>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/dashboard/inmuebles"
            className="bg-white border border-gray-300 rounded-lg p-6 hover:border-green-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h4 className=" text-[#000] font-semibold">Gestionar Inmuebles</h4>
                <p className="text-sm text-gray-600 mt-1">Ver y editar todas tus propiedades</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}