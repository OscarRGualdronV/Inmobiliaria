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
      <div className="text-center py-12">
        <div className="bg-white rounded-xl p-10 max-w-2xl mx-auto border border-gray-200 shadow-sm">
          <div className="text-gray-300 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No hay propiedades destacadas disponibles
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Pronto tendremos nuevas propiedades destacadas para ti.
            Explora nuestras otras categorías mientras tanto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div 
            key={property.id}
            className="transform transition-all duration-300 hover:-translate-y-1"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      
      {/* Indicador de scroll solo cuando hay más de 3 propiedades */}
      {properties.length > 3 && (
        <div className="text-center mt-10 pt-6">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
            Desplázate para ver más propiedades
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </p>
        </div>
      )}
    </>
  );
}