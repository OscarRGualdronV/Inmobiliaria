import Link from "next/link";

const categories = [
  {
    name: "Casas",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    count: "150+",
    link: "/inmuebles?tipo=CASA",
    gradient: "from-blue-50 to-blue-100",
    color: "text-blue-700",
    border: "border-blue-200",
  },
  {
    name: "Apartamentos",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    count: "200+",
    link: "/inmuebles?tipo=APARTAMENTO",
    gradient: "from-emerald-50 to-emerald-100",
    color: "text-emerald-700",
    border: "border-emerald-200",
  },
  {
    name: "Predios Rurales",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
      </svg>
    ),
    count: "50+",
    link: "/inmuebles?tipo=PREDIO_RURAL",
    gradient: "from-amber-50 to-amber-100",
    color: "text-amber-700",
    border: "border-amber-200",
  },
  {
    name: "Terrenos",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
    count: "80+",
    link: "/inmuebles?tipo=TERRENO",
    gradient: "from-violet-50 to-violet-100",
    color: "text-violet-700",
    border: "border-violet-200",
  },
  {
    name: "Oficinas",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    count: "30+",
    link: "/inmuebles?tipo=OFICINA",
    gradient: "from-rose-50 to-rose-100",
    color: "text-rose-700",
    border: "border-rose-200",
  },
  {
    name: "Locales Comerciales",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    count: "40+",
    link: "/inmuebles?tipo=LOCAL_COMERCIAL",
    gradient: "from-cyan-50 to-cyan-100",
    color: "text-cyan-700",
    border: "border-cyan-200",
  },
];

export default function PropertyCategories() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explora por Categoría
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Encuentra el tipo de propiedad que mejor se adapte a tus necesidades 
            con la asesoría especializada de <span className="font-semibold text-blue-800">NEIRA</span>
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className={`group relative bg-white rounded-2xl p-8 border ${category.border} 
                hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
                hover:border-transparent overflow-hidden`}
            >
              {/* Fondo con gradiente sutil */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 
                group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute top-0 -inset-x-4 h-32 bg-gradient-to-b from-white to-transparent opacity-0 
                group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              
              {/* Contenido */}
              <div className="flex flex-col items-center text-center">
                {/* Icono */}
                <div className={`w-20 h-20 rounded-2xl ${category.gradient} flex items-center justify-center 
                  mb-6 group-hover:scale-110 transition-transform duration-300 border ${category.border}`}>
                  <div className={category.color}>
                    {category.icon}
                  </div>
                </div>
                
                {/* Nombre y contador */}
                <h3 className={`text-xl font-bold ${category.color} mb-3 group-hover:text-gray-900 transition-colors`}>
                  {category.name}
                </h3>
                
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-gray-900 mr-2">{category.count}</span>
                  <span className="text-gray-600">propiedades</span>
                </div>
                
                {/* Texto descriptivo */}
                <p className="text-gray-500 text-sm mb-6 min-h-[40px]">
                  {category.name === "Casas" && "Amplias y cómodas viviendas familiares"}
                  {category.name === "Apartamentos" && "Viviendas modernas en edificios residenciales"}
                  {category.name === "Predios Rurales" && "Terrenos agrícolas y fincas productivas"}
                  {category.name === "Terrenos" && "Lotes para construcción o inversión"}
                  {category.name === "Oficinas" && "Espacios profesionales para empresas"}
                  {category.name === "Locales Comerciales" && "Negocios y espacios comerciales"}
                </p>
                
                {/* Botón de acción */}
                <div className={`mt-auto pt-6 border-t ${category.border} w-full`}>
                  <span className={`inline-flex items-center ${category.color} font-medium text-sm group-hover:text-gray-900 transition-colors`}>
                    Explorar categoría
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA adicional */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-1">
            <div className="bg-white rounded-xl p-8 max-w-3xl mx-auto border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Nuestros asesores pueden ayudarte a encontrar la propiedad perfecta 
                según tus necesidades específicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88z"/>
                  </svg>
                  Solicitar asesoría personalizada
                </a>
                <Link
                  href="/inmuebles"
                  className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Ver todas las propiedades
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}