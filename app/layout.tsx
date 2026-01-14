import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarHandler from "@/components/NavbarHandler";
import FooterHandler from "@/components/FooterHandler";

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
        <NavbarHandler />
        <main className="min-h-screen">{children}</main>
        <FooterHandler />
      </body>
    </html>
  );
}