import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicNavbar from "@/components/dashboard/public/PublicNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inmobiliaria - Venta de Inmuebles y Predios Rurales",
  description:
    "Encuentra tu propiedad ideal. Miles de inmuebles y predios rurales disponibles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Solo muestra el navbar en páginas públicas */}
        <PublicNavbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Inmobiliaria</h3>
            <p className="text-gray-400">
              Especialistas en venta de inmuebles y predios rurales.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">Email: contacto@inmobiliaria.com</p>
            <p className="text-gray-400">Teléfono: (601) 123-4567</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Horario</h4>
            <p className="text-gray-400">Lunes a Viernes: 8am - 6pm</p>
            <p className="text-gray-400">Sábados: 9am - 2pm</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2024 Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
