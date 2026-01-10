import { FormSectionProps } from "@/types/InmuebleTypes";

export default function Ubicacion({ register, errors }: FormSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        3. Ubicación
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección *
          </label>
          <input
            type="text"
            {...register("direccion")}
            className="text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dirección exacta o referencia"
          />
          {errors.direccion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.direccion.message}
            </p>
          )}
        </div>

        {/* Ciudad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            {...register("ciudad")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Medellín"
          />
          {errors.ciudad && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ciudad.message}
            </p>
          )}
        </div>

        {/* Departamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departamento *
          </label>
          <input
            type="text"
            {...register("departamento")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Antioquia"
          />
          {errors.departamento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.departamento.message}
            </p>
          )}
        </div>


        {/* Coordenadas (opcionales) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitud (opcional)
          </label>
          <input
            type="number"
            step="any"
            {...register("lat", { valueAsNumber: true })}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 6.244203"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitud (opcional)
          </label>
          <input
            type="number"
            step="any"
            {...register("lng", { valueAsNumber: true })}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: -75.581212"
          />
        </div>
      </div>
    </div>
  );
}