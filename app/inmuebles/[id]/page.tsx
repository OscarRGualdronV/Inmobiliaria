"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Inmueble {
  id: number;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  precio: number;
  moneda: string;
  area: number | null;
  areaUnidad: string;
  habitaciones: number | null;
  banos: number | null;
  estrato: number | null;
  tieneGaraje: boolean;
  imagenes: string[];
  direccion: string | null;
  ciudad: string | null;
  publicadoEn: Date;
  estado: string;
  destacado: boolean;
  vistas: number;
  accesoAgua: boolean;
  accesoLuz: boolean;
  vendedor: {
    id: number;
    nombre: string;
    email: string;
    telefono: string | null;
    whatsapp: string | null;
  };
}

export default function DetalleInmueble() {
  const params = useParams();
  const router = useRouter();
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagenPrincipal, setImagenPrincipal] = useState(0);

  useEffect(() => {
    const fetchInmueble = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/inmuebles/${params.id}`);
        if (!response.ok) throw new Error("Error al cargar el inmueble");
        const data = await response.json();
        setInmueble(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchInmueble();
  }, [params.id]);

  const formatCurrency = (amount: number, moneda: string) => {
    const currency = moneda === "USD" ? "USD" : "COP";
    const locale = moneda === "USD" ? "en-US" : "es-CO";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: moneda === "USD" ? 2 : 0,
    }).format(amount);
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      APARTAMENTO: "Apartamento",
      CASA: "Casa",
      PREDIO_RURAL: "Predio Rural",
      FINCA: "Finca",
      OFICINA: "Oficina",
      LOCAL_COMERCIAL: "Local Comercial",
    };
    return labels[tipo] || tipo;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!inmueble) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-bold mb-4 text-gray-700">
          Inmueble no encontrado
        </div>
        <Link
          href="/inmuebles"
          className="flex items-center text-blue-900 hover:text-blue-800"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver a propiedades
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Volver
            </button>
            <h1 className="text-xl font-bold text-gray-900 truncate">{inmueble.titulo}</h1>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galería y detalles */}
          <div className="lg:col-span-2">
            {/* Galería */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="relative h-64 md:h-96">
                {inmueble.imagenes && inmueble.imagenes.length > 0 ? (
                  <Image
                    src={inmueble.imagenes[imagenPrincipal]}
                    alt={inmueble.titulo}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {inmueble.destacado && (
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      Destacado
                    </span>
                  )}
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                    inmueble.estado === "DISPONIBLE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {inmueble.estado}
                  </span>
                </div>
              </div>

              {/* Miniaturas */}
              {inmueble.imagenes && inmueble.imagenes.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4 border-t">
                  {inmueble.imagenes.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenPrincipal(index)}
                      className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                        imagenPrincipal === index
                          ? "ring-2 ring-blue-900"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Vista ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">
                {inmueble.descripcion || "Sin descripción disponible."}
              </p>
            </div>

            {/* Especificaciones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Detalles de la propiedad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <div>
                      <div className="text-sm text-gray-600">Tipo</div>
                      <div className="font-medium">{getTipoLabel(inmueble.tipo)}</div>
                    </div>
                  </div>

                  {inmueble.area && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                      </svg>
                      <div>
                        <div className="text-sm text-gray-600">Área</div>
                        <div className="font-medium">
                          {inmueble.area} {inmueble.areaUnidad === "HECTAREAS" ? "ha" : "m²"}
                        </div>
                      </div>
                    </div>
                  )}

                  {inmueble.estrato !== null && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      <div>
                        <div className="text-sm text-gray-600">Estrato</div>
                        <div className="font-medium">{inmueble.estrato}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {inmueble.habitaciones !== null && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      <div>
                        <div className="text-sm text-gray-600">Habitaciones</div>
                        <div className="font-medium">{inmueble.habitaciones}</div>
                      </div>
                    </div>
                  )}

                  {inmueble.banos !== null && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <div className="text-sm text-gray-600">Baños</div>
                        <div className="font-medium">{inmueble.banos}</div>
                      </div>
                    </div>
                  )}

                  {inmueble.tieneGaraje && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                      </svg>
                      <div>
                        <div className="text-sm text-gray-600">Garaje</div>
                        <div className="font-medium">Sí</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral - Contacto y precio */}
          <div className="space-y-6">
            {/* Precio y ubicación */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {formatCurrency(inmueble.precio, inmueble.moneda)}
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{inmueble.direccion || "Sin dirección específica"}</span>
              </div>

              {inmueble.ciudad && (
                <div className="text-gray-700 mb-4">
                  <span className="font-medium">{inmueble.ciudad}</span>
                </div>
              )}

              <div className="text-sm text-gray-500">
                Publicado el {new Date(inmueble.publicadoEn).toLocaleDateString("es-CO")}
              </div>
            </div>

            {/* Contacto vendedor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contactar al vendedor</h3>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-900 font-bold text-lg">
                    {inmueble.vendedor.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{inmueble.vendedor.nombre}</div>
                  <div className="text-sm text-gray-600">Asesor NEIRA</div>
                </div>
              </div>

              <div className="space-y-3">
                {inmueble.vendedor.whatsapp && (
                  <a
                    href={`https://wa.me/${inmueble.vendedor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88z"/>
                    </svg>
                    WhatsApp
                  </a>
                )}

                {inmueble.vendedor.telefono && (
                  <a
                    href={`tel:${inmueble.vendedor.telefono}`}
                    className="flex items-center justify-center bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-950 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Llamar ahora
                  </a>
                )}

                <a
                  href={`mailto:${inmueble.vendedor.email}`}
                  className="flex items-center justify-center border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Enviar email
                </a>
              </div>
            </div>

            {/* Características adicionales para predios */}
            {(inmueble.tipo === "PREDIO_RURAL" || inmueble.tipo === "FINCA") && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Características del predio</h3>
                <div className="space-y-3">
                  {inmueble.accesoAgua && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                      </svg>
                      <span className="text-gray-700">Acceso a agua</span>
                    </div>
                  )}
                  {inmueble.accesoLuz && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span className="text-gray-700">Acceso a energía eléctrica</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Estadísticas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Visitas</div>
                  <div className="text-2xl font-bold text-gray-900">{inmueble.vistas}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Publicado</div>
                  <div className="font-medium text-gray-900">
                    {new Date(inmueble.publicadoEn).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short"
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}