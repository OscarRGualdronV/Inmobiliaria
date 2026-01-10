"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Home,
  ChevronDown,
  X,
  Car,
  Zap,
  Droplets,
  Trees,
  Check,
} from "lucide-react";
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
  pisos: number | null;
  antiguedad: number | null;
  estrato: number | null;
  tieneGaraje: boolean;
  amoblado: boolean;
  imagenes: string[];
  ciudad: string | null;
  departamento: string | null;
  estado: string;
  destacado: boolean;
  publicadoEn: Date;
  topografia: string | null;
  accesoAgua: boolean;
  accesoLuz: boolean;
  viaAcceso: string | null;
  cultivos: string | null;
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
  const [showFilters, setShowFilters] = useState(false);

  // Filtros principales
  const [filters, setFilters] = useState({
    search: "",
    tipo: "",
    ciudad: "",
    departamento: "",
    minPrecio: "",
    maxPrecio: "",
    minHabitaciones: "",
    minBanos: "",
    minArea: "",
    maxArea: "",
    estrato: "",
    estado: "DISPONIBLE",
  });

  const [pendingFilters, setPendingFilters] = useState({
    minPrecio: "",
    maxPrecio: "",
    minArea: "",
    maxArea: "",
    minHabitaciones: "",
    minBanos: "",
  });

  // Filtros de características generales
  const [features, setFeatures] = useState({
    tieneGaraje: false,
    amoblado: false,
  });

  // Filtros específicos para predios rurales
  const [ruralFeatures, setRuralFeatures] = useState({
    accesoAgua: false,
    accesoLuz: false,
    topografia: "",
    viaAcceso: "",
  });

  // Ordenamiento
  const [orderBy, setOrderBy] = useState("recientes");

  // Tipos de propiedades
  const tipos = [
    { value: "", label: "Todos los tipos" },
    { value: "APARTAMENTO", label: "Apartamento" },
    { value: "CASA", label: "Casa" },
    { value: "LOTE_URBANO", label: "Lote Urbano" },
    { value: "PREDIO_RURAL", label: "Predio Rural" },
    { value: "FINCA", label: "Finca" },
    { value: "OFICINA", label: "Oficina" },
    { value: "LOCAL_COMERCIAL", label: "Local Comercial" },
    { value: "BODEGA", label: "Bodega" },
    { value: "OTRO", label: "Otro" },
  ];

  // Topografías
  const topografias = [
    { value: "", label: "Cualquier topografía" },
    { value: "PLANA", label: "Plana" },
    { value: "ONDULADA", label: "Ondulada" },
    { value: "QUEBRADA", label: "Quebrada" },
    { value: "MONTANOSA", label: "Montañosa" },
  ];

  // Vías de acceso
  const viasAcceso = [
    { value: "", label: "Cualquier vía" },
    { value: "PAVIMENTADA", label: "Pavimentada" },
    { value: "DESTAPADA", label: "Destapada" },
    { value: "TROCHA", label: "Trocha" },
    { value: "FLUVIAL", label: "Fluvial" },
  ];

  // Estratos
  const estratos = [
    { value: "", label: "Cualquier estrato" },
    { value: "1", label: "Estrato 1" },
    { value: "2", label: "Estrato 2" },
    { value: "3", label: "Estrato 3" },
    { value: "4", label: "Estrato 4" },
    { value: "5", label: "Estrato 5" },
    { value: "6", label: "Estrato 6" },
  ];

  // Estados de propiedad
  const estados = [
    { value: "DISPONIBLE", label: "Disponible" },
    { value: "RESERVADO", label: "Reservado" },
    { value: "VENDIDO", label: "Vendido" },
  ];

  const applyPendingFilters = () => {
    setFilters((prev) => ({
      ...prev,
      ...pendingFilters,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      applyPendingFilters();
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingFilters]);

  // Obtener inmuebles y ciudades disponibles
  useEffect(() => {
    const fetchInmuebles = async () => {
      setLoading(true);
      try {
        // Construir URL con parámetros
        const params = new URLSearchParams();

        // Agregar filtros principales
        if (filters.tipo) params.append("tipo", filters.tipo);
        if (filters.ciudad) params.append("ciudad", filters.ciudad);
        if (filters.departamento)
          params.append("departamento", filters.departamento);
        if (filters.minPrecio) params.append("minPrecio", filters.minPrecio);
        if (filters.maxPrecio) params.append("maxPrecio", filters.maxPrecio);
        if (filters.minHabitaciones)
          params.append("minHabitaciones", filters.minHabitaciones);
        if (filters.minBanos) params.append("minBanos", filters.minBanos);
        if (filters.minArea) params.append("minArea", filters.minArea);
        if (filters.maxArea) params.append("maxArea", filters.maxArea);
        if (filters.estrato) params.append("estrato", filters.estrato);
        params.append("estado", filters.estado);
        if (filters.search) params.append("search", filters.search);

        // Agregar características
        if (features.tieneGaraje) params.append("tieneGaraje", "true");
        if (features.amoblado) params.append("amoblado", "true");

        // Agregar características rurales solo si el tipo es rural
        if (filters.tipo === "PREDIO_RURAL" || filters.tipo === "FINCA") {
          if (ruralFeatures.accesoAgua) params.append("accesoAgua", "true");
          if (ruralFeatures.accesoLuz) params.append("accesoLuz", "true");
          if (ruralFeatures.topografia)
            params.append("topografia", ruralFeatures.topografia);
          if (ruralFeatures.viaAcceso)
            params.append("viaAcceso", ruralFeatures.viaAcceso);
        }

        const response = await fetch(`/api/inmuebles/public?${params}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setInmuebles(result.data);

          // Extraer ciudades únicas de los inmuebles
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
  }, [filters, features, ruralFeatures]);

  // Filtrar y ordenar inmuebles localmente
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
          return (
            new Date(b.publicadoEn).getTime() -
            new Date(a.publicadoEn).getTime()
          );
        case "destacados":
          return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
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
      LOTE_URBANO: "Lote Urbano",
      PREDIO_RURAL: "Predio Rural",
      FINCA: "Finca",
      OFICINA: "Oficina",
      LOCAL_COMERCIAL: "Local Comercial",
      BODEGA: "Bodega",
      OTRO: "Otro",
    };
    return labels[tipo] || tipo;
  };

  const getUnidadArea = (unidad: string) => {
    return unidad === "HECTAREAS" ? "ha" : "m²";
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      tipo: "",
      ciudad: "",
      departamento: "",
      minPrecio: "",
      maxPrecio: "",
      minHabitaciones: "",
      minBanos: "",
      minArea: "",
      maxArea: "",
      estrato: "",
      estado: "DISPONIBLE",
    });

    setPendingFilters({
      minPrecio: "",
      maxPrecio: "",
      minArea: "",
      maxArea: "",
      minHabitaciones: "",
      minBanos: "",
    });

    setFeatures({
      tieneGaraje: false,
      amoblado: false,
    });
    setRuralFeatures({
      accesoAgua: false,
      accesoLuz: false,
      topografia: "",
      viaAcceso: "",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyPendingFilters();
      e.currentTarget.blur();
    }
  };

  const handleTipoChange = (value: string) => {
    setFilters({ ...filters, tipo: value });
    // Resetear filtros rurales si no es rural
    if (value !== "PREDIO_RURAL" && value !== "FINCA") {
      setRuralFeatures({
        accesoAgua: false,
        accesoLuz: false,
        topografia: "",
        viaAcceso: "",
      });
    }
  };

  const isTipoRural =
    filters.tipo === "PREDIO_RURAL" || filters.tipo === "FINCA";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con búsqueda */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Encuentra tu propiedad ideal
          </h1>
          <p className="text-lg text-white mb-8">
            {filteredInmuebles.length} propiedades disponibles
          </p>

          {/* Barra de búsqueda principal */}
          <div className="max-w-4xl mx-auto">
            {/* Filtros rápidos */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Filter size={18} />
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg focus:outline-none appearance-none cursor-pointer"
              >
                <option value="recientes" className="bg-blue-600 text-white">
                  Más recientes
                </option>
                <option value="destacados" className="bg-blue-600 text-white">
                  Destacados primero
                </option>
                <option value="precio_asc" className="bg-blue-600 text-white">
                  Precio: menor a mayor
                </option>
                <option value="precio_desc" className="bg-blue-600 text-white">
                  Precio: mayor a menor
                </option>
                <option value="area_asc" className="bg-blue-600 text-white">
                  Área: menor a mayor
                </option>
                <option value="area_desc" className="bg-blue-600 text-white">
                  Área: mayor a menor
                </option>
              </select>

              <select
                value={filters.estado}
                onChange={(e) =>
                  setFilters({ ...filters, estado: e.target.value })
                }
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg focus:outline-none appearance-none cursor-pointer"
              >
                {estados.map((estado) => (
                  <option
                    key={estado.value}
                    value={estado.value}
                    className="bg-blue-600 text-white"
                  >
                    {estado.label}
                  </option>
                ))}
              </select>

              {Object.values(filters).some(
                (filter, index) =>
                  filter !== "" &&
                  filter !== "DISPONIBLE" &&
                  Object.keys(filters)[index] !== "estado"
              ) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <X size={18} />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros avanzados */}
      {showFilters && (
        <div className="bg-white shadow-lg border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-8">
              {/* Filtros principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tipo de propiedad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de propiedad
                  </label>
                  <select
                    value={filters.tipo}
                    onChange={(e) => handleTipoChange(e.target.value)}
                    className="text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    onChange={(e) =>
                      setFilters({ ...filters, ciudad: e.target.value })
                    }
                    className="text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todas las ciudades</option>
                    {ciudadesDisponibles.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rango de precios */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rango de precio (COP)
                  </label>
                  <div className="text-[#000] flex gap-2">
                    <input
                      type="number"
                      placeholder="Mínimo"
                      value={pendingFilters.minPrecio}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          minPrecio: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                      className="text-[#000] w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder="Máximo"
                      value={pendingFilters.maxPrecio}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          maxPrecio: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                      className="text-[#000] w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>

                {/* Estrato */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estrato
                  </label>
                  <select
                    value={filters.estrato}
                    onChange={(e) =>
                      setFilters({ ...filters, estrato: e.target.value })
                    }
                    className="text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {estratos.map((estrato) => (
                      <option key={estrato.value} value={estrato.value}>
                        {estrato.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtros de características */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Características
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {/* Garaje */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div
                      className={`w-5 h-5 border rounded flex items-center justify-center ${
                        features.tieneGaraje
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {features.tieneGaraje && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={features.tieneGaraje}
                      onChange={(e) =>
                        setFeatures({
                          ...features,
                          tieneGaraje: e.target.checked,
                        })
                      }
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <Car size={16} className="mr-2 text-gray-600" />
                      <span className="text-sm text-gray-700">Garaje</span>
                    </div>
                  </label>

                  {/* Amoblado */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div
                      className={`w-5 h-5 border rounded flex items-center justify-center ${
                        features.amoblado
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {features.amoblado && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={features.amoblado}
                      onChange={(e) =>
                        setFeatures({ ...features, amoblado: e.target.checked })
                      }
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <Home size={16} className="mr-2 text-gray-600" />
                      <span className="text-sm text-gray-700">Amoblado</span>
                    </div>
                  </label>

                  {/* Habitaciones mínimas */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Habitaciones
                    </label>
                    <select
                      value={pendingFilters.minHabitaciones}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          minHabitaciones: e.target.value,
                        })
                      }
                      className="text-[#000] w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Cualquier</option>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Baños mínimos */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Baños
                    </label>
                    <select
                      value={pendingFilters.minBanos}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          minBanos: e.target.value,
                        })
                      }
                      className="text-[#000] w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Cualquier</option>
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Área mínima */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Área mínima
                    </label>
                    <input
                      type="number"
                      placeholder="m²/ha"
                      value={pendingFilters.minArea}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          minArea: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                      className="text-[#000] w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="0"
                    />
                  </div>

                  {/* Área máxima */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Área máxima
                    </label>
                    <input
                      type="number"
                      placeholder="m²/ha"
                      value={pendingFilters.maxArea}
                      onChange={(e) =>
                        setPendingFilters({
                          ...pendingFilters,
                          maxArea: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                      className="text-[#000] w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Filtros específicos para predios rurales */}
              {isTipoRural && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Trees size={20} className="mr-2 text-green-600" />
                    Características Rurales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Acceso a agua */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${
                          ruralFeatures.accesoAgua
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {ruralFeatures.accesoAgua && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={ruralFeatures.accesoAgua}
                        onChange={(e) =>
                          setRuralFeatures({
                            ...ruralFeatures,
                            accesoAgua: e.target.checked,
                          })
                        }
                        className="hidden"
                      />
                      <div className="flex items-center">
                        <Droplets size={16} className="mr-2 text-blue-600" />
                        <span className="text-sm text-gray-700">
                          Acceso a agua
                        </span>
                      </div>
                    </label>

                    {/* Acceso a luz */}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${
                          ruralFeatures.accesoLuz
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {ruralFeatures.accesoLuz && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={ruralFeatures.accesoLuz}
                        onChange={(e) =>
                          setRuralFeatures({
                            ...ruralFeatures,
                            accesoLuz: e.target.checked,
                          })
                        }
                        className="hidden"
                      />
                      <div className="flex items-center">
                        <Zap size={16} className="mr-2 text-yellow-600" />
                        <span className="text-sm text-gray-700">
                          Acceso a luz
                        </span>
                      </div>
                    </label>

                    {/* Topografía */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Topografía
                      </label>
                      <select
                        value={ruralFeatures.topografia}
                        onChange={(e) =>
                          setRuralFeatures({
                            ...ruralFeatures,
                            topografia: e.target.value,
                          })
                        }
                        className="text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {topografias.map((topografia) => (
                          <option
                            key={topografia.value}
                            value={topografia.value}
                          >
                            {topografia.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vía de acceso */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vía de acceso
                      </label>
                      <select
                        value={ruralFeatures.viaAcceso}
                        onChange={(e) =>
                          setRuralFeatures({
                            ...ruralFeatures,
                            viaAcceso: e.target.value,
                          })
                        }
                        className="text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {viasAcceso.map((via) => (
                          <option key={via.value} value={via.value}>
                            {via.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 flex justify-end">
        <button
          onClick={applyPendingFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Aplicar filtros
        </button>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Resultados */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Propiedades disponibles
            <span className="text-gray-600 text-lg font-normal ml-2">
              ({filteredInmuebles.length} resultados)
            </span>
          </h2>
        </div>

        {filteredInmuebles.length === 0 ? (
          <div className="text-center py-12">
            <Home size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta con otros criterios de búsqueda o{" "}
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                limpia todos los filtros
              </button>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInmuebles.map((inmueble) => (
              <Link
                key={inmueble.id}
                href={`/inmuebles/${inmueble.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
              >
                {/* Badge destacado */}
                {inmueble.destacado && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ Destacado
                    </span>
                  </div>
                )}

                {/* Estado */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      inmueble.estado === "DISPONIBLE"
                        ? "bg-green-100 text-green-800"
                        : inmueble.estado === "VENDIDO"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {inmueble.estado}
                  </span>
                </div>

                {/* Imagen */}
                <div className="relative h-48 overflow-hidden">
                  {inmueble.imagenes && inmueble.imagenes.length > 0 ? (
                    <Image
                      src={inmueble.imagenes[0]}
                      alt={inmueble.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Home size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Información */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {inmueble.titulo}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>
                        {inmueble.ciudad || "Ubicación no disponible"}
                      </span>
                    </div>
                  </div>

                  {/* Tipo */}
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-3">
                    {getTipoLabel(inmueble.tipo)}
                  </span>

                  {/* Características rápidas */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {inmueble.habitaciones !== null && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Bed size={14} className="mr-1" />
                        <span>{inmueble.habitaciones}</span>
                      </div>
                    )}

                    {inmueble.banos !== null && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Bath size={14} className="mr-1" />
                        <span>{inmueble.banos}</span>
                      </div>
                    )}

                    {inmueble.area !== null && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Square size={14} className="mr-1" />
                        <span>
                          {inmueble.area} {getUnidadArea(inmueble.areaUnidad)}
                        </span>
                      </div>
                    )}

                    {inmueble.tieneGaraje && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Car size={14} className="mr-1" />
                        <span>Garaje</span>
                      </div>
                    )}

                    {(inmueble.tipo === "PREDIO_RURAL" ||
                      inmueble.tipo === "FINCA") && (
                      <>
                        {inmueble.accesoAgua && (
                          <div className="flex items-center text-gray-700 text-sm">
                            <Droplets
                              size={14}
                              className="mr-1 text-blue-500"
                            />
                            <span>Agua</span>
                          </div>
                        )}
                        {inmueble.accesoLuz && (
                          <div className="flex items-center text-gray-700 text-sm">
                            <Zap size={14} className="mr-1 text-yellow-500" />
                            <span>Luz</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="border-t pt-4">
                    <div className="text-lg font-bold text-blue-700">
                      {formatCurrency(inmueble.precio, inmueble.moneda)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Publicado{" "}
                      {new Date(inmueble.publicadoEn).toLocaleDateString(
                        "es-CO"
                      )}
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
