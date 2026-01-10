import { FormSectionProps } from "@/types/InmuebleTypes";

export default function InformacionBasica({
  register,
  errors,
}: FormSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        1. Información Básica
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *{" "}
            <span className="text-gray-500 text-sm">
              (ej: &quot;Hermosa casa campestre con piscina&quot;)
            </span>
          </label>
          <input
            type="text"
            {...register("titulo")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título descriptivo de la propiedad"
          />
          {errors.titulo && (
            <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Propiedad *
          </label>
          <select
            {...register("tipo")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="APARTAMENTO">Apartamento</option>
            <option value="CASA">Casa</option>
            <option value="LOTE_URBANO">Lote Urbano</option>
            <option value="PREDIO_RURAL">Predio Rural</option>
            <option value="FINCA">Finca</option>
            <option value="OFICINA">Oficina</option>
            <option value="LOCAL_COMERCIAL">Local Comercial</option>
            <option value="BODEGA">Bodega</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *{" "}
            <span className="text-gray-500 text-sm">
              (Describe la propiedad en detalle)
            </span>
          </label>
          <textarea
            rows={4}
            {...register("descripcion")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción detallada de la propiedad, características, ventajas, etc."
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.descripcion.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
