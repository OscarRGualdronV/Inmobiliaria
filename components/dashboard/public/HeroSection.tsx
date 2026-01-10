import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Encuentra tu{" "}
            <span className="text-yellow-300">propiedad ideal</span>
          </h1>
          <p className="text-xl mb-8">
            Miles de inmuebles y predios rurales disponibles. Tu próximo hogar o
            inversión te espera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/inmuebles"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 text-center"
            >
              Ver Propiedades
            </Link>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 text-center"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
