import Link from "next/link";

interface Property {
  id: number;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  precio: number;
  area: number | null;
  habitaciones: number | null;
  banos: number | null;
  ciudad: string | null;
  imagenes: string[];
  vendedor: {
    nombre: string;
    whatsapp: string | null;
  };
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPropertyTypeLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      APARTAMENTO: "Apartamento",
      CASA: "Casa",
      LOTE_URBANO: "Lote Urbano",
      PREDIO_RURAL: "Predio Rural",
      FINCA: "Finca",
      OFICINA: "Oficina",
      LOCAL_COMERCIAL: "Local Comercial",
      BODEGA: "Bodega",
      OTRO: "Otro",
    };
    return labels[tipo] || tipo;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen */}
      <div className="h-48 bg-gray-300 relative">
        {property.imagenes.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.imagenes[0]}
            alt={property.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-4xl">🏠</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {getPropertyTypeLabel(property.tipo)}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {property.titulo}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <span className="mr-4">
            {property.ciudad || "Ubicación no especificada"}
          </span>
        </div>

        {/* Características */}
        <div className="flex flex-wrap gap-4 mb-4">
          {property.area && (
            <div className=" text-[#000] flex items-center">
              <span className=" mr-1">📐</span>
              <span>{property.area} m²</span>
            </div>
          )}
          {property.habitaciones && (
            <div className=" text-[#000] flex items-center">
              <span className="text-gray-500 mr-1">🛏️</span>
              <span>{property.habitaciones} hab.</span>
            </div>
          )}
          {property.banos && (
            <div className=" text-[#000] flex items-center">
              <span className="text-gray-500 mr-1">🚿</span>
              <span>{property.banos} baños</span>
            </div>
          )}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(property.precio)}
          </p>
        </div>

        {/* Acciones */}
        <div className="flex justify-between items-center">
          <Link
            href={`/inmuebles/${property.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver detalles →
          </Link>

          {property.vendedor.whatsapp && (
            <a
              href={`https://wa.me/${property.vendedor.whatsapp}?text=Hola, me interesa la propiedad: ${property.titulo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <span className="mr-2">💬</span>
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
