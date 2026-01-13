"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Cerrar menú al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay para menú móvil */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-1 md:py-0">
            {/* Logo - Responsivo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                {/* Logo en móvil - AUMENTADO */}
                <div className="lg:hidden relative">
                  <div 
                    className="relative" 
                    style={{ 
                      width: '250px',  // Aumentado de 160px a 200px
                      height: '170px'   // Aumentado de 60px a 80px
                    }}
                  >
                    <Image 
                      src="/logo.png" 
                      alt="NEIRA Asesoría Inmobiliaria"
                      fill
                      className="object-contain"
                      priority
                      quality={100}
                      sizes="(max-width: 768px) 200px, 350px" // Ajustado
                    />
                  </div>
                </div>
                
                {/* Logo en desktop - Ajustado para mejor proporción */}
                <div className="hidden lg:flex relative items-center justify-center">
                  <div 
                    className="relative"
                    style={{ 
                      width: '380px',  // Aumentado de 350px a 380px
                      height: '380px', // Aumentado de 350px a 380px
                      marginTop: '-100px', // Ajustado
                      marginBottom: '-100px' // Ajustado
                    }}
                  >
                    <Image 
                      src="/logo.png" 
                      alt="NEIRA Asesoría Inmobiliaria"
                      fill
                      className="object-contain"
                      priority
                      quality={100}
                      sizes="380px"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Hamburger menu para móvil - Ajustado para estar más centrado */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>

            {/* Navegación principal - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-900 font-semibold transition-colors duration-200 relative group text-base xl:text-lg"
              >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/inmuebles"
                className="text-gray-800 hover:text-blue-900 font-semibold transition-colors duration-200 relative group text-base xl:text-lg"
              >
                Propiedades
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-gray-800 hover:text-blue-900 font-semibold transition-colors duration-200 relative group text-base xl:text-lg"
              >
                Sobre Nosotros
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Acciones - Desktop */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 xl:px-5 py-2 xl:py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88z"/>
                </svg>
                <span className="hidden xl:inline">WhatsApp</span>
                <span className="xl:hidden">WA</span>
              </a>
              <Link
                href="/login"
                className="bg-blue-900 hover:bg-blue-950 text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:scale-95 text-sm xl:text-base"
              >
                Acceso Vendedor
              </Link>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="p-6">
            {/* Header del menú móvil con logo - AUMENTADO */}
            <div className="flex items-center mb-8 pb-6 border-b">
              <div 
                className="relative" 
                style={{ 
                  width: '250px',  // Aumentado de 180px a 220px
                  height: '250px'   // Aumentado de 70px a 85px
                }}
              >
                <Image 
                  src="/logo.png" 
                  alt="NEIRA Asesoría Inmobiliaria"
                  fill
                  className="object-contain"
                  quality={100}
                  sizes="350px"
                />
              </div>
            </div>
            
            {/* Navegación móvil */}
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center py-3 px-4 text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                Inicio
              </Link>
              
              <Link
                href="/inmuebles"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center py-3 px-4 text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                Propiedades
              </Link>
              
              <Link
                href="/sobre-nosotros"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center py-3 px-4 text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Sobre Nosotros
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mb-3"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88z"/>
                  </svg>
                  WhatsApp
                </a>
                
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center bg-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-950 transition-colors"
                >
                  Acceso Vendedor
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}