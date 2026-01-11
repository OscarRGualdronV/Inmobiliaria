import PropertyCard from "./PropertyCard";

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

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({
  properties,
}: FeaturedPropertiesProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-50 rounded-2xl p-12 max-w-2xl mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay propiedades destacadas disponibles
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Pronto tendremos nuevas propiedades destacadas para ti.
            Explora nuestras otras categorías mientras tanto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent -z-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div 
            key={property.id}
            className="transform transition-all duration-300 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      
      {/* Indicador de scroll si hay muchas propiedades */}
      {properties.length > 3 && (
        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <svg className="w-4 h-4 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
            Desplázate para ver más propiedades
            <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </p>
        </div>
      )}
    </div>
  );
}