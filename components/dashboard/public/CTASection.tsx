import Link from "next/link";

export default function CTASection() {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para encontrar tu propiedad ideal?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-200">
          Contáctanos hoy mismo y recibe asesoría personalizada 
          con la experiencia de <span className="font-bold">NEIRA</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Contactar por WhatsApp
          </a>
          <Link
            href="/inmuebles"
            className="bg-white hover:bg-gray-100 text-blue-900 px-10 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Ver Todas las Propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}