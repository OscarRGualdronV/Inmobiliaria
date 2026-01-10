import { redirect } from "next/navigation";
import { getCurrentVendedor } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InmuebleForm from "@/components/dashboard/Inmuebleform";

export default async function NuevoInmueblePage() {
  const vendedor = await getCurrentVendedor();

  if (!vendedor) {
    redirect("/login");
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link
            href="/dashboard/inmuebles"
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Crear Nuevo Inmueble
          </h1>
          <p className="text-gray-600 mt-2">
            Completa todos los campos para publicar una nueva propiedad
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-lg shadow p-6">
        <InmuebleForm vendedorId={vendedor.id} />
      </div>

      {/* Información importante */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">
          💡 Información importante
        </h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• Los campos marcados con * son obligatorios</li>
          <li>• Las imágenes deben ser en formato JPG, PNG o WebP</li>
          <li>• El precio debe ser ingresado sin puntos ni comas</li>
          <li>• Puedes guardar como borrador o publicar inmediatamente</li>
          <li>• Los predios rurales tienen campos específicos adicionales</li>
        </ul>
      </div>
    </div>
  );
}
