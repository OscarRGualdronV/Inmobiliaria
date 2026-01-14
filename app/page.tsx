import HeroSection from "@/components/dashboard/public/HeroSection";
import FeaturedProperties from "@/components/dashboard/public/FeaturedProperties";
import PropertyCategories from "@/components/dashboard/public/PropertyCategories";
import CTASection from "@/components/dashboard/public/CTASection";
import { prisma } from "@/lib/prisma";

// ✅ AGREGAR ESTAS 2 LÍNEAS (lo más importante)
export const revalidate = 30; // Revalidar cada 30 segundos
export const dynamic = 'force-dynamic'; // Forzar actualización dinámica

export default async function Home() {
  // Obtener inmuebles destacados - YA TIENE EL FILTRO CORRECTO ✅
  const featuredProperties = await prisma.inmueble.findMany({
    where: {
      estado: "DISPONIBLE", // ← ESTO ESTÁ BIEN
      destacado: true,
    },
    take: 6,
    include: {
      vendedor: {
        select: {
          nombre: true,
          whatsapp: true,
        },
      },
    },
    orderBy: { publicadoEn: "desc" },
  });

  // Obtener estadísticas - TAMBIÉN NECESITAN FILTRO
  const stats = {
    totalProperties: await prisma.inmueble.count({
      where: { estado: "DISPONIBLE" }, // ← ESTO ESTÁ BIEN
    }),
    soldProperties: await prisma.inmueble.count({
      where: { estado: "VENDIDO" },
    }),
    ruralProperties: await prisma.inmueble.count({
      where: { 
        tipo: "PREDIO_RURAL",
        estado: "DISPONIBLE" // ← AGREGAR FILTRO AQUÍ TAMBIÉN
      },
    }),
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Estadísticas */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-800 mb-3">
                {stats.totalProperties}+
              </div>
              <p className="text-gray-600 font-medium">
                Propiedades Disponibles
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-800 mb-3">
                {stats.soldProperties}+
              </div>
              <p className="text-gray-600 font-medium">Propiedades Vendidas</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-800 mb-3">
                {stats.ruralProperties}+
              </div>
              <p className="text-gray-600 font-medium">Predios Rurales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Propiedades Destacadas */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Propiedades <span className="text-blue-900">Destacadas</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Descubre nuestras mejores propiedades seleccionadas especialmente
              para ti
            </p>
          </div>
          <FeaturedProperties properties={featuredProperties} />
        </div>
      </div>

      {/* Categorías */}
      <PropertyCategories />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}