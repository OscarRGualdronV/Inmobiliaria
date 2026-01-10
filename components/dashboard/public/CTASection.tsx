import Link from "next/link";

export default function CTASection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para encontrar tu propiedad ideal?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contáctanos hoy mismo y recibe asesoría personalizada para tu compra o
          venta
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
          >
            Contactar por WhatsApp
          </a>
          <Link
            href="/inmuebles"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100"
          >
            Ver Todas las Propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}
