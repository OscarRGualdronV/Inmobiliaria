import HeroSection from "@/components/dashboard/public/HeroSection";
import FeaturedProperties from "@/components/dashboard/public/FeaturedProperties";
import PropertyCategories from "@/components/dashboard/public/PropertyCategories";
import CTASection from "@/components/dashboard/public/CTASection";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Obtener inmuebles destacados
  const featuredProperties = await prisma.inmueble.findMany({
    where: {
      estado: "DISPONIBLE",
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

  // Obtener estadísticas
  const stats = {
    totalProperties: await prisma.inmueble.count({
      where: { estado: "DISPONIBLE" },
    }),
    soldProperties: await prisma.inmueble.count({
      where: { estado: "VENDIDO" },
    }),
    ruralProperties: await prisma.inmueble.count({
      where: { tipo: "PREDIO_RURAL" },
    }),
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Estadísticas */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalProperties}+
              </div>
              <p className="text-gray-600">Propiedades Disponibles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.soldProperties}+
              </div>
              <p className="text-gray-600">Propiedades Vendidas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stats.ruralProperties}+
              </div>
              <p className="text-gray-600">Predios Rurales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Propiedades Destacadas */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Descubre nuestras mejores propiedades seleccionadas especialmente
            para ti
          </p>
        </div>
        <FeaturedProperties properties={featuredProperties} />
      </div>

      {/* Categorías */}
      <PropertyCategories />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
