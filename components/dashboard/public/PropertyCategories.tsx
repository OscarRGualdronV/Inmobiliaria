import Link from "next/link";

const categories = [
  {
    name: "Casas",
    icon: "🏠",
    count: "150+",
    link: "/inmuebles?tipo=CASA",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Apartamentos",
    icon: "🏢",
    count: "200+",
    link: "/inmuebles?tipo=APARTAMENTO",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Predios Rurales",
    icon: "🌳",
    count: "50+",
    link: "/predios-rurales",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Lotes Urbanos",
    icon: "📐",
    count: "80+",
    link: "/inmuebles?tipo=LOTE_URBANO",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Oficinas",
    icon: "💼",
    count: "30+",
    link: "/inmuebles?tipo=OFICINA",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Locales",
    icon: "🏪",
    count: "40+",
    link: "/inmuebles?tipo=LOCAL_COMERCIAL",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function PropertyCategories() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explora por Categoría
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra el tipo de propiedad que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className={`${category.color} rounded-lg p-6 text-center hover:shadow-lg transition-shadow`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm">{category.count} propiedades</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
