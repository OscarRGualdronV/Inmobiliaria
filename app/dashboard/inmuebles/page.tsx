import { redirect } from "next/navigation";
import { getCurrentVendedor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import InmueblesTable from "@/components/dashboard/InmuebleTable";

// Definir interfaz para inmueble
interface InmuebleTable {
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

export default async function InmueblesPage() {
  const vendedor = await getCurrentVendedor();

  if (!vendedor) {
    redirect("/login");
  }

  const inmuebles: InmuebleTable[] = await prisma.inmueble.findMany({
    where: { vendedorId: vendedor.id },
    orderBy: { publicadoEn: "desc" },
    select: {
      id: true,
      titulo: true,
      tipo: true,
      precio: true,
      ciudad: true,
      estado: true,
      publicadoEn: true,
      vistas: true,
      destacado: true,
    },
  });

  const estadisticas = {
    total: inmuebles.length,
    disponibles: inmuebles.filter(
      (i: InmuebleTable) => i.estado === "DISPONIBLE"
    ).length,
    vendidos: inmuebles.filter((i: InmuebleTable) => i.estado === "VENDIDO")
      .length,
    destacados: inmuebles.filter((i: InmuebleTable) => i.destacado).length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Inmuebles</h1>
          <p className="text-gray-600">Gestiona todas tus propiedades</p>
        </div>
        <Link
          href="/dashboard/inmuebles/nuevo"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={20} className="mr-2" />
          Nuevo Inmueble
        </Link>
      </div>

      {/* Estadísticas rápidas */}
      <div className="text-[#000] grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total</h3>
          <p className="text-2xl font-bold mt-2">{estadisticas.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">En Venta</h3>
          <p className="text-2xl font-bold mt-2">{estadisticas.disponibles}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Vendidos</h3>
          <p className="text-2xl font-bold mt-2">{estadisticas.vendidos}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Destacados</h3>
          <p className="text-2xl font-bold mt-2">{estadisticas.destacados}</p>
        </div>
      </div>

      {/* Tabla de inmuebles */}
      <div className="bg-white rounded-lg shadow">
        <InmueblesTable inmuebles={inmuebles} />
      </div>
    </div>
  );
}
