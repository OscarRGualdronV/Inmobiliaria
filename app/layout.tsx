import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicNavbar from "@/components/dashboard/public/PublicNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEIRA - Asesoría Inmobiliaria",
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
      <body className={`${inter.className} bg-white text-gray-800`}>
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white">NEIRA</h3>
            <p className="text-gray-300 max-w-md">
              Asesoría Inmobiliaria profesional especializada en venta de 
              inmuebles y predios rurales. Encuentra tu propiedad ideal con nosotros.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contacto</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Email: contacto@neiraasesoria.com</p>
              <p className="text-gray-300">Teléfono: (601) 123-4567</p>
              <p className="text-gray-300">WhatsApp: +57 300 123 4567</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Horario</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Lunes a Viernes: 8am - 6pm</p>
              <p className="text-gray-300">Sábados: 9am - 2pm</p>
              <p className="text-gray-300">Domingos: Cerrado</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} NEIRA Asesoría Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}