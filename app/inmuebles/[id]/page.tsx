"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Car,
  Home,
  Layers,
  Droplets,
  Zap,
  TreePine,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Definir interfaz basada en el schema de Prisma
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
  pisos: number | null;
  antiguedad: number | null;
  estrato: number | null;
  tieneGaraje: boolean;
  amoblado: boolean;
  imagenes: string[];
  direccion: string | null;
  ciudad: string | null;
  departamento: string | null;
  lat: number | null;
  lng: number | null;
  publicadoEn: Date;
  actualizadoEn: Date;
  estado: string;
  destacado: boolean;
  vistas: number;
  topografia: string | null;
  accesoAgua: boolean;
  accesoLuz: boolean;
  viaAcceso: string | null;
  cultivos: string | null;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInmueble = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/inmuebles/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Inmueble no encontrado");
          }
          throw new Error("Error al cargar el inmueble");
        }

        const data = await response.json();
        setInmueble(data);
      } catch (error) {
        console.error("Error al cargar el inmueble:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInmueble();
    }
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

  const formatArea = (area: number | null, unidad: string) => {
    if (!area) return "N/A";
    return unidad === "HECTAREAS" ? `${area} ha` : `${area} m²`;
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      APARTAMENTO: "Apartamento",
      CASA: "Casa",
      LOTE_URBANO: "Lote Urbano",
      PREDIO_RURAL: "Predio Rural",
      FINCA: "Finca",
      OFICINA: "Oficina",
      LOCAL_COMERCIAL: "Local Comercial",
      BODEGA: "Bodega",
      OTRO: "Otro",
    };
    return labels[tipo] || tipo.replace("_", " ");
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "DISPONIBLE":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Disponible",
        };
      case "VENDIDO":
        return { bg: "bg-blue-100", text: "text-blue-800", label: "Vendido" };
      case "RESERVADO":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          label: "Reservado",
        };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", label: estado };
    }
  };

  const getCaracteristicas = (inmueble: Inmueble) => {
    const caracteristicas = [];

    if (inmueble.tieneGaraje) caracteristicas.push("Garaje");
    if (inmueble.amoblado) caracteristicas.push("Amoblado");
    if (inmueble.accesoAgua) caracteristicas.push("Agua");
    if (inmueble.accesoLuz) caracteristicas.push("Energía eléctrica");
    if (inmueble.topografia)
      caracteristicas.push(`Topografía: ${inmueble.topografia.toLowerCase()}`);
    if (inmueble.viaAcceso)
      caracteristicas.push(`Vía: ${inmueble.viaAcceso.toLowerCase()}`);
    if (inmueble.cultivos)
      caracteristicas.push(`Cultivos: ${inmueble.cultivos}`);

    return caracteristicas;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !inmueble) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-bold mb-4 text-red-600">
          {error || "Inmueble no encontrado"}
        </div>
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al inicio
        </Link>
      </div>
    );
  }

  const estadoInfo = getEstadoColor(inmueble.estado);
  const caracteristicas = getCaracteristicas(inmueble);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} className="mr-2" />
                Volver
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {inmueble.titulo}
                </h1>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin size={14} className="mr-1" />
                  <span>
                    {inmueble.direccion || "Sin dirección"}
                    {inmueble.ciudad && `, ${inmueble.ciudad}`}
                    {inmueble.departamento && `, ${inmueble.departamento}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-xl md:text-2xl font-bold text-blue-700">
                {formatCurrency(inmueble.precio, inmueble.moneda)}
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${estadoInfo.bg} ${estadoInfo.text}`}
              >
                {estadoInfo.label}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        {/* Galería de imágenes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gray-200">
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
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Home size={64} />
                </div>
              )}
            </div>

            {inmueble.imagenes && inmueble.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {inmueble.imagenes.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenPrincipal(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                      imagenPrincipal === index
                        ? "ring-2 ring-blue-500 transform scale-105"
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

          {/* Información del contacto */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6 pb-6 border-b">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-lg">
                  {inmueble.vendedor.nombre.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className=" text-[#000] font-bold text-lg">
                  {inmueble.vendedor.nombre}
                </h3>
                <p className="text-gray-600 text-sm">Vendedor</p>
              </div>
            </div>

            <div className="space-y-4">
              {inmueble.vendedor.telefono && (
                <a
                  href={`tel:${inmueble.vendedor.telefono}`}
                  className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone size={20} className="mr-2" />
                  Llamar ahora
                </a>
              )}

              {inmueble.vendedor.whatsapp && (
                <a
                  href={`https://wa.me/${inmueble.vendedor.whatsapp.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[#25D366] text-white py-3 px-4 rounded-lg hover:bg-[#128C7E] transition-colors"
                >
                  💬 WhatsApp
                </a>
              )}

              <a
                href={`mailto:${inmueble.vendedor.email}`}
                className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ✉️ Enviar email
              </a>
            </div>

            {/* Estadísticas */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {inmueble.vistas}
                  </div>
                  <div className="text-sm text-gray-600">Visitas</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(inmueble.publicadoEn).toLocaleDateString(
                      "es-CO",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <div className="text-xs text-gray-600">Publicado</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-[#000] text-xl font-bold mb-4 flex items-center">
                <Home size={20} className="mr-2 text-blue-600" />
                Descripción
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {inmueble.descripcion || "Sin descripción disponible."}
              </p>
            </div>

            {/* Características */}
            {caracteristicas.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-[#000] text-xl font-bold mb-4">Características</h2>
                <div className="text-[#000] grid grid-cols-1 md:grid-cols-2 gap-3">
                  {caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Especificaciones */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-[#000] text-xl font-bold mb-4">Especificaciones</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[#000] flex items-center">
                    <Home size={18} className="text-black-400 mr-3" />
                    <span>Tipo</span>
                  </div>
                  <span className="text-[#000] font-bold">
                    {getTipoLabel(inmueble.tipo)}
                  </span>
                </div>

                {inmueble.area && (
                  <div className="flex items-center justify-between">
                    <div className="text-[#000] flex items-center">
                      <Square size={18} className="text-black-400 mr-3" />
                      <span>Área</span>
                    </div>
                    <span className="text-[#000] font-bold">
                      {formatArea(inmueble.area, inmueble.areaUnidad)}
                    </span>
                  </div>
                )}

                {inmueble.habitaciones !== null && (
                  <div className="flex items-center justify-between">
                    <div className="text-[#000] flex items-center">
                      <Bed size={18} className="text-black-400 mr-3" />
                      <span>Habitaciones</span>
                    </div>
                    <span className="text-[#000] font-bold">{inmueble.habitaciones}</span>
                  </div>
                )}

                {inmueble.banos !== null && (
                  <div className="flex items-center justify-between">
                    <div className="text-[#000] flex items-center">
                      <Bath size={18} className="text-black-400 mr-3" />
                      <span>Baños</span>
                    </div>
                    <span className="text-[#000] font-bold">{inmueble.banos}</span>
                  </div>
                )}

                {inmueble.antiguedad !== null && (
                  <div className="flex items-center justify-between">
                    <div className="text-[#000] flex items-center">
                      <Calendar size={18} className="text-black-400 mr-3" />
                      <span>Antigüedad</span>
                    </div>
                    <span className="text-[#000] font-bold">
                      {inmueble.antiguedad} años
                    </span>
                  </div>
                )}

                {inmueble.estrato !== null && (
                  <div className="flex items-center justify-between">
                    <div className="text-[#000] flex items-center">
                      <Layers size={18} className="text-black-400 mr-3" />
                      <span>Estrato</span>
                    </div>
                    <span className="text-[#000] font-bold">{inmueble.estrato}</span>
                  </div>
                )}

                {inmueble.tieneGaraje && (
                  <div className="flex items-center justify-between">
                    <div className="text-[#000] flex items-center">
                      <Car size={18} className="text-black-400 mr-3" />
                      <span>Garaje</span>
                    </div>
                    <span className="text-[#000] font-bold">Sí</span>
                  </div>
                )}

                {/* Características especiales para predios rurales */}
                {inmueble.tipo === "PREDIO_RURAL" ||
                inmueble.tipo === "FINCA" ? (
                  <>
                    {inmueble.accesoAgua && (
                      <div className="flex items-center justify-between">
                        <div className="text-[#000] flex items-center">
                          <Droplets size={18} className="text-black-400 mr-3" />
                          <span>Acceso agua</span>
                        </div>
                        <span className="text-[#000] font-bold">Sí</span>
                      </div>
                    )}

                    {inmueble.accesoLuz && (
                      <div className="flex items-center justify-between">
                        <div className="text-[#000] flex items-center">
                          <Zap size={18} className="text-black-400 mr-3" />
                          <span>Acceso luz</span>
                        </div>
                        <span className="text-[#000] font-bold">Sí</span>
                      </div>
                    )}

                    {inmueble.cultivos && (
                      <div className="flex items-center justify-between">
                        <div className="text-[#000] flex items-center">
                          <TreePine size={18} className="text-black-400 mr-3" />
                          <span>Cultivos</span>
                        </div>
                        <span className="text-[#000] font-bold text-right">
                          {inmueble.cultivos}
                        </span>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>

            {/* Estado destacado */}
            {inmueble.destacado && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-5">
                <div className="flex items-start">
                  <div className="text-yellow-500 mr-3 text-2xl">⭐</div>
                  <div>
                    <h3 className="font-bold text-yellow-800 text-lg">
                      Propiedad Destacada
                    </h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      Esta propiedad tiene máxima visibilidad y prioridad en
                      nuestro sitio web.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mapa */}
        {inmueble.lat && inmueble.lng && (
          <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MapPin size={20} className="mr-2 text-blue-600" />
              Ubicación
            </h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Aquí iría tu mapa (Google Maps, Leaflet, etc.) */}
              <div className="text-center z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg">
                <MapPin size={32} className="text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 font-medium">
                  {inmueble.direccion}
                </p>
                <p className="text-gray-600">
                  {inmueble.ciudad && `${inmueble.ciudad}, `}
                  {inmueble.departamento}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Coordenadas: {inmueble.lat?.toFixed(6)},{" "}
                  {inmueble.lng?.toFixed(6)}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-100"></div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-300">
          <p>
            © {new Date().getFullYear()} Inmobiliaria. Todos los derechos
            reservados.
          </p>
          <p className="mt-2">
            Información sujeta a verificación. Las imágenes son ilustrativas.
          </p>
        </div>
      </footer>
    </div>
  );
}
