import Link from 'next/link'

interface Inmueble {
  id: number
  titulo: string
  tipo: string
  precio: number
  ciudad: string | null
  estado: string
  publicadoEn: Date
  vistas: number
}

interface InmueblesRecientesProps {
  inmuebles: Inmueble[]
}

export default function InmueblesRecientes({ inmuebles }: InmueblesRecientesProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (inmuebles.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-4">
          <span className="text-4xl">🏠</span>
        </div>
        <p className="text-gray-500 mb-4">No hay inmuebles registrados</p>
        <Link 
          href="/dashboard/inmuebles/nuevo"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Agregar primer inmueble
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Propiedad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Visitas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inmuebles.map((inmueble) => (
            <tr key={inmueble.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{inmueble.titulo}</div>
                  <div className="text-sm text-gray-500">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                      {inmueble.tipo.replace('_', ' ')}
                    </span>
                    {inmueble.ciudad && (
                      <span className="ml-2"> {inmueble.ciudad}</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className=" text-[#000] text-sm font-semibold">
                  {formatCurrency(inmueble.precio)}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  inmueble.estado === 'DISPONIBLE' 
                    ? 'bg-green-100 text-green-800'
                    : inmueble.estado === 'VENDIDO'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {inmueble.estado}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {inmueble.vistas} visitas
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {formatDate(inmueble.publicadoEn)}
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/dashboard/inmuebles/${inmueble.id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}