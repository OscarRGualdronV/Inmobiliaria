import { redirect } from "next/navigation";
import { getCurrentVendedor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ConfiguracionForm from "@/components/dashboard/Configuracionform";

export default async function ConfiguracionPage() {
  const vendedor = await getCurrentVendedor();

  if (!vendedor) {
    redirect("/login");
  }

  // Obtener datos completos del vendedor
  const vendedorCompleto = await prisma.vendedor.findUnique({
    where: { id: vendedor.id },
    select: {
      id: true,
      nombre: true,
      email: true,
      telefono: true,
      whatsapp: true,
    },
  });

  if (!vendedorCompleto) {
    redirect("/login");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Actualiza tu información de contacto</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Información de Contacto
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Esta información aparecerá en las propiedades para que los
            compradores puedan contactarte. Asegúrate de que sea correcta y
            actualizada.
          </p>

          <ConfiguracionForm vendedor={vendedorCompleto} />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">📱 Importante</h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>
              • El número de WhatsApp debe incluir código de país (ej:
              573001234567 para Colombia)
            </li>
            <li>
              • Los compradores verán solo el botón de WhatsApp en las
              propiedades
            </li>
            <li>• Tu número de teléfono es opcional, pero recomendado</li>
            <li>
              • Tu email es para acceder al panel, no se muestra públicamente
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
