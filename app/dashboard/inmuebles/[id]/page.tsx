import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormInmueble from "@/components/FormInmueble";

export default async function EditarInmueblePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const inmueble = await prisma.inmueble.findUnique({
    where: { id: parseInt(id) },
  });

  if (!inmueble) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Editar Inmueble</h1>
        <p className="text-gray-600 mt-2">
          Actualiza la información del inmueble
        </p>
      </div>

      <FormInmueble inmueble={inmueble} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inmueble = await prisma.inmueble.findUnique({
    where: { id: parseInt(id) },
    select: { titulo: true },
  });

  return {
    title: inmueble ? `Editar: ${inmueble.titulo}` : "Editar Inmueble",
  };
}
