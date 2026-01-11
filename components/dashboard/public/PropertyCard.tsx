// @/components/dashboard/public/PropertyCard.tsx - Versión mejorada
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Property {
  id: number;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  precio: number;
  area: number | null;
  habitaciones: number | null;
  banos: number | null;
  ciudad: string | null;
  imagenes: string[];
  vendedor: {
    nombre: string;
    whatsapp: string | null;
  };
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      CASA: "Casa",
      APARTAMENTO: "Apartamento",
      FINCA: "Finca",
      TERRENO: "Terreno",
      PREDIO_RURAL: "Predio Rural",
      LOCAL_COMERCIAL: "Local Comercial",
      OFICINA: "Oficina",
    };
    return types[type] || type;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* Encabezado con imagen */}
      <div className="relative h-64 overflow-hidden">
        {property.imagenes && property.imagenes.length > 0 ? (
          <>
            <Image
              src={property.imagenes[currentImageIndex]}
              alt={property.titulo}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Indicadores de imagen */}
            {property.imagenes.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {property.imagenes.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
        )}
        
        {/* Badge de tipo */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-900/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
            {getPropertyTypeLabel(property.tipo)}
          </span>
        </div>
        
        {/* Badge de precio */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 text-blue-900 px-3 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm shadow-md">
            {formatPrice(property.precio)}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título y ubicación */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-800 transition-colors">
            {property.titulo}
          </h3>
          {property.ciudad && (
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {property.ciudad}
            </div>
          )}
        </div>

        {/* Descripción */}
        {property.descripcion && (
          <p className="text-gray-600 mb-5 line-clamp-2 text-sm leading-relaxed">
            {property.descripcion}
          </p>
        )}

        {/* Características */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {property.area && (
            <div className="text-center">
              <div className="text-gray-900 font-bold text-lg">{property.area}m²</div>
              <div className="text-gray-500 text-xs">Área</div>
            </div>
          )}
          
          {property.habitaciones !== null && (
            <div className="text-center">
              <div className="text-gray-900 font-bold text-lg">{property.habitaciones}</div>
              <div className="text-gray-500 text-xs">Habitaciones</div>
            </div>
          )}
          
          {property.banos !== null && (
            <div className="text-center">
              <div className="text-gray-900 font-bold text-lg">{property.banos}</div>
              <div className="text-gray-500 text-xs">Baños</div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-5"></div>

        {/* Vendedor y acciones */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{property.vendedor.nombre}</p>
              <p className="text-xs text-gray-500">Asesor NEIRA</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {property.vendedor.whatsapp && (
              <a
                href={`https://wa.me/${property.vendedor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-lg transition-colors duration-200"
                title="Contactar por WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88z"/>
                </svg>
              </a>
            )}
            
            <Link
              href={`/inmuebles/${property.id}`}
              className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center"
            >
              <span>Ver Detalles</span>
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}