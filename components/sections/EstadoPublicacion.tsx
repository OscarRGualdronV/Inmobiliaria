import { FormSectionProps } from "@/types/InmuebleTypes";

export default function EstadoPublicacion({
  register,
  errors,
}: FormSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        6. Estado y Publicación
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado *
          </label>
          <select
            {...register("estado")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DISPONIBLE">Disponible</option>
            <option value="RESERVADO">Reservado</option>
            <option value="VENDIDO">Vendido</option>
          </select>
          {errors.estado && (
            <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>
          )}
        </div>

        {/* Destacado */}
        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("destacado")}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="ml-2 text-gray-700">Destacar propiedad</span>
          </label>
          <span className="ml-2 text-xs text-gray-500">
            (Aparecerá en la página principal)
          </span>
        </div>
      </div>
    </div>
  );
}
