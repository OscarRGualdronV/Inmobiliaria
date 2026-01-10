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
        <p className="text-gray-600">
          No hay propiedades destacadas disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
