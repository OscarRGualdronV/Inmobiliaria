import Link from "next/link";

export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Inmobiliaria
            </Link>
          </div>

          {/* Navegación principal */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/inmuebles"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Propiedades
            </Link>
            <Link
              href="/contacto"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contacto
            </Link>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <span className="mr-2">💬</span>
              WhatsApp
            </a>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Acceso Vendedor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
