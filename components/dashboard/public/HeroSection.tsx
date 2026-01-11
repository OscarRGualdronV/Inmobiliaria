import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Encuentra tu{" "}
            <span className="text-blue-300">propiedad ideal</span>
          </h1>
          <p className="text-xl mb-10 text-gray-200">
            Con la asesoría profesional de <span className="font-semibold">NEIRA</span>. 
            Miles de inmuebles y predios rurales disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/inmuebles"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 text-center shadow-lg"
            >
              Ver Propiedades
            </Link>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold text-center shadow-lg"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}