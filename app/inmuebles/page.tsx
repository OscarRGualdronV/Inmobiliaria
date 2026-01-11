"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Definir interfaces
interface Inmueble {
  id: number;
  titulo: string;
  tipo: string;
  precio: number;
  moneda: string;
  area: number | null;
  areaUnidad: string;
  habitaciones: number | null;
  banos: number | null;
  imagenes: string[];
  ciudad: string | null;
  estado: string;
  destacado: boolean;
  publicadoEn: Date;
  tieneGaraje: boolean;
}

interface ApiResponse {
  success: boolean;
  data: Inmueble[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasMore: boolean;
  };
}

export default function InmueblesPage() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);
  const [ciudadesDisponibles, setCiudadesDisponibles] = useState<string[]>([]);

  // Filtros principales
  const [filters, setFilters] = useState({
    tipo: "",
    ciudad: "",
    minPrecio: "",
    maxPrecio: "",
    minHabitaciones: "",
    minBanos: "",
  });

  // Ordenamiento
  const [orderBy, setOrderBy] = useState("recientes");

  // Tipos de propiedades
  const tipos = [
    { value: "", label: "Todos los tipos" },
    { value: "APARTAMENTO", label: "Apartamento" },
    { value: "CASA", label: "Casa" },
    { value: "PREDIO_RURAL", label: "Predio Rural" },
    { value: "FINCA", label: "Finca" },
    { value: "OFICINA", label: "Oficina" },
    { value: "LOCAL_COMERCIAL", label: "Local Comercial" },
  ];

  // Obtener inmuebles
  useEffect(() => {
    const fetchInmuebles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.tipo) params.append("tipo", filters.tipo);
        if (filters.ciudad) params.append("ciudad", filters.ciudad);
        if (filters.minPrecio) params.append("minPrecio", filters.minPrecio);
        if (filters.maxPrecio) params.append("maxPrecio", filters.maxPrecio);
        if (filters.minHabitaciones) params.append("minHabitaciones", filters.minHabitaciones);
        if (filters.minBanos) params.append("minBanos", filters.minBanos);
        params.append("estado", "DISPONIBLE");

        const response = await fetch(`/api/inmuebles/public?${params}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const result: ApiResponse = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setInmuebles(result.data);
          const ciudadesUnicas = Array.from(
            new Set(
              result.data
                .map((inmueble) => inmueble.ciudad)
                .filter((ciudad): ciudad is string => ciudad !== null)
            )
          ).sort();
          setCiudadesDisponibles(ciudadesUnicas);
        } else {
          setInmuebles([]);
          setCiudadesDisponibles([]);
        }
      } catch (error) {
        console.error("Error cargando inmuebles:", error);
        setInmuebles([]);
        setCiudadesDisponibles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, [filters]);

  // Filtrar y ordenar inmuebles
  const filteredInmuebles = useMemo(() => {
    return [...inmuebles].sort((a, b) => {
      switch (orderBy) {
        case "precio_asc":
          return a.precio - b.precio;
        case "precio_desc":
          return b.precio - a.precio;
        case "area_asc":
          return (a.area || 0) - (b.area || 0);
        case "area_desc":
          return (b.area || 0) - (a.area || 0);
        case "recientes":
          return new Date(b.publicadoEn).getTime() - new Date(a.publicadoEn).getTime();
        default:
          return 0;
      }
    });
  }, [inmuebles, orderBy]);

  // Helper functions
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

  const resetFilters = () => {
    setFilters({
      tipo: "",
      ciudad: "",
      minPrecio: "",
      maxPrecio: "",
      minHabitaciones: "",
      minBanos: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra tu propiedad ideal
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              {filteredInmuebles.length} propiedades disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Filtros principales */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Tipo de propiedad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={filters.tipo}
                onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
              >
                {tipos.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <select
                value={filters.ciudad}
                onChange={(e) => setFilters({ ...filters, ciudad: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
              >
                <option value="">Todas las ciudades</option>
                {ciudadesDisponibles.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>
            </div>

            {/* Precio mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio mínimo
              </label>
              <input
                type="number"
                placeholder="COP"
                value={filters.minPrecio}
                onChange={(e) => setFilters({ ...filters, minPrecio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                min="0"
              />
            </div>

            {/* Precio máximo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio máximo
              </label>
              <input
                type="number"
                placeholder="COP"
                value={filters.maxPrecio}
                onChange={(e) => setFilters({ ...filters, maxPrecio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                min="0"
              />
            </div>

            {/* Ordenar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
              >
                <option value="recientes">Más recientes</option>
                <option value="precio_asc">Precio: menor a mayor</option>
                <option value="precio_desc">Precio: mayor a menor</option>
                <option value="area_desc">Área: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <select
                value={filters.minHabitaciones}
                onChange={(e) => setFilters({ ...filters, minHabitaciones: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option value="">Habitaciones</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>

              <select
                value={filters.minBanos}
                onChange={(e) => setFilters({ ...filters, minBanos: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option value="">Baños</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Limpiar filtros
              </button>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Contactar asesor
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Resultados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Propiedades disponibles
            <span className="text-gray-600 text-lg font-normal ml-2">
              ({filteredInmuebles.length} resultados)
            </span>
          </h2>
        </div>

        {filteredInmuebles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta con otros criterios de búsqueda
            </p>
            <button
              onClick={resetFilters}
              className="text-blue-900 hover:text-blue-800 font-medium"
            >
              Limpiar todos los filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInmuebles.map((inmueble) => (
              <Link
                key={inmueble.id}
                href={`/inmuebles/${inmueble.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-900"
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden">
                  {inmueble.imagenes && inmueble.imagenes.length > 0 ? (
                    <Image
                      src={inmueble.imagenes[0]}
                      alt={inmueble.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {inmueble.destacado && (
                      <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Destacado
                      </span>
                    )}
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      inmueble.estado === "DISPONIBLE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {inmueble.estado}
                    </span>
                  </div>
                </div>

                {/* Información */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 text-lg mb-2">
                      {inmueble.titulo}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span>{inmueble.ciudad || "Ubicación no disponible"}</span>
                    </div>
                  </div>

                  {/* Tipo */}
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-900 text-xs font-medium rounded-full mb-4">
                    {getTipoLabel(inmueble.tipo)}
                  </span>

                  {/* Características */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {inmueble.habitaciones !== null && (
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <span className="text-sm">{inmueble.habitaciones} hab.</span>
                      </div>
                    )}

                    {inmueble.banos !== null && (
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span className="text-sm">{inmueble.banos} baños</span>
                      </div>
                    )}

                    {inmueble.area !== null && (
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                        </svg>
                        <span className="text-sm">{inmueble.area} {inmueble.areaUnidad === "HECTAREAS" ? "ha" : "m²"}</span>
                      </div>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="border-t pt-4">
                    <div className="text-xl font-bold text-blue-900">
                      {formatCurrency(inmueble.precio, inmueble.moneda)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Publicado {new Date(inmueble.publicadoEn).toLocaleDateString("es-CO")}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}