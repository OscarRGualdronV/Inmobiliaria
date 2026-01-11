"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "shadow-lg" : "shadow-md"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo grande pero con contenedor ajustado */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Contenedor ajustado para no empujar el navbar */}
              <div 
                className="relative flex items-center justify-center"
                style={{ 
                  height: '370px',  // Altura máxima del navbar
                  width: '370px',   // Ancho del logo
                  marginTop: '-90px', // Sube un poco el logo
                  marginBottom: '-90px' // Sube un poco el logo
                }}
              >
                <Image 
                  src="/logo.png" 
                  alt="NEIRA Asesoría Inmobiliaria"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                  sizes="350px"
                />
              </div>
            </Link>
          </div>

          {/* Navegación principal - Desktop */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="text-gray-800 hover:text-blue-900 font-semibold transition-colors duration-200 relative group text-lg"
            >
              Inicio
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/inmuebles"
              className="text-gray-800 hover:text-blue-900 font-semibold transition-colors duration-200 relative group text-lg"
            >
              Propiedades
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-gray-800 hover:text-blue-900 font-semibold transition-colors duration-200 relative group text-lg"
            >
              Sobre Nosotros
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-6">
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88z"/>
              </svg>
              WhatsApp
            </a>
            <Link
              href="/login"
              className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-105"
            >
              Acceso Vendedor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}