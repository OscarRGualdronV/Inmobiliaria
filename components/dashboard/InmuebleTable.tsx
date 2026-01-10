"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Star, Eye } from "lucide-react";

// Definir interfaz
interface Inmueble {
  id: number;
  titulo: string;
  tipo: string;
  precio: number;
  ciudad: string | null;
  estado: string;
  publicadoEn: Date;
  vistas: number;
  destacado: boolean;
}

interface InmueblesTableProps {
  inmuebles: Inmueble[];
}

export default function InmueblesTable({ inmuebles }: InmueblesTableProps) {
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-CO");
  };

  const filteredInmuebles = inmuebles.filter((inmueble: Inmueble) => {
    const matchesSearch =
      inmueble.titulo.toLowerCase().includes(search.toLowerCase()) ||
      (inmueble.ciudad?.toLowerCase() || "").includes(search.toLowerCase()) ||
      inmueble.tipo.toLowerCase().includes(search.toLowerCase());

    const matchesEstado = filterEstado
      ? inmueble.estado === filterEstado
      : true;

    return matchesSearch && matchesEstado;
  });

  return (
    <div>
      {/* Filtros */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por título, ciudad o tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" text-[#000] w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="text-[#000] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              <option value="DISPONIBLE">Disponible</option>
              <option value="VENDIDO">Vendido</option>
              <option value="RESERVADO">Reservado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Propiedad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Visitas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Destacado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInmuebles.map((inmueble: Inmueble) => (
              <tr key={inmueble.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {inmueble.titulo}
                    </div>
                    <div className="text-sm text-gray-500">
                      {inmueble.ciudad || "Sin ubicación"}
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded">
                        {inmueble.tipo.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[#000] text-sm font-semibold">
                    {formatCurrency(inmueble.precio)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      inmueble.estado === "DISPONIBLE"
                        ? "bg-green-100 text-green-800"
                        : inmueble.estado === "VENDIDO"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {inmueble.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye size={16} className="mr-1" />
                    {inmueble.vistas}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {inmueble.destacado ? (
                    <Star
                      size={20}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ) : (
                    <Star size={20} className="text-gray-300" />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(inmueble.publicadoEn)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/inmuebles/${inmueble.id}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver en sitio público"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/dashboard/inmuebles/${inmueble.id}`}
                      className="text-green-600 hover:text-green-900"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">{filteredInmuebles.length}</span> de{" "}
            <span className="font-medium">{inmuebles.length}</span> inmuebles
          </div>
          {filteredInmuebles.length === 0 && (
            <div className="text-center text-gray-500">
              No se encontraron inmuebles que coincidan con la búsqueda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
