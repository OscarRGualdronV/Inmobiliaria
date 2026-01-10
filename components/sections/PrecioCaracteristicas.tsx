import { FormSectionProps } from "@/types/InmuebleTypes";

export default function PrecioCaracteristicas({
  register,
  errors,
  watch,
}: FormSectionProps) {
  const areaUnidad = watch?.("areaUnidad");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
          2. Precio y Características
        </h2>

        <div className="space-y-8">
          {/* Primera fila: Precio y Área */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Precio */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Precio *
              </label>
              <div className="flex">
                <select
                  {...register("moneda")}
                  className="text-[#000] px-3 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="COP">COP $</option>
                  <option value="USD">USD $</option>
                </select>
                <input
                  type="number"
                  {...register("precio", { valueAsNumber: true })}
                  className="text-[#000] flex-1 px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Ej: 850000000"
                  min="0"
                />
              </div>
              {errors.precio && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.precio.message}
                </p>
              )}
            </div>

            {/* Área */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Área
              </label>
              <div className="flex">
                <input
                  type="number"
                  step="0.01"
                  {...register("area", { valueAsNumber: true })}
                  className="text-[#000] flex-1 px-3 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder={
                    areaUnidad === "HECTAREAS" ? "Ej: 2.5" : "Ej: 150"
                  }
                  min="0"
                />
                <select
                  {...register("areaUnidad")}
                  className=" text-[#000] px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="METROS_CUADRADOS">m²</option>
                  <option value="HECTAREAS">Hectáreas</option>
                </select>
              </div>
              {errors.area && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.area.message}
                </p>
              )}
            </div>
          </div>

          {/* Segunda fila: Habitaciones y Baños */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Habitaciones */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Habitaciones
              </label>
              <input
                type="number"
                {...register("habitaciones", { valueAsNumber: true })}
                className=" text-[#000] w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0"
                min="0"
              />
              {errors.habitaciones && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.habitaciones.message}
                </p>
              )}
            </div>

            {/* Baños */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Baños
              </label>
              <input
                type="number"
                {...register("banos", { valueAsNumber: true })}
                className=" text-[#000] w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0"
                min="0"
              />
              {errors.banos && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.banos.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sección de características adicionales */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Características Adicionales
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primera columna: Checkboxes */}
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                {...register("tieneGaraje")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                id="garaje"
              />
              <label
                htmlFor="garaje"
                className="ml-3 text-gray-700 font-medium cursor-pointer"
              >
                Tiene garaje
              </label>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                {...register("amoblado")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                id="amoblado"
              />
              <label
                htmlFor="amoblado"
                className="ml-3 text-gray-700 font-medium cursor-pointer"
              >
                Amoblado
              </label>
            </div>
          </div>

          {/* Segunda columna: Inputs numéricos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pisos */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Pisos
              </label>
              <input
                type="number"
                {...register("pisos", { valueAsNumber: true })}
                className="text-[#000] w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="1"
                min="0"
              />
              {errors.pisos && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.pisos.message}
                </p>
              )}
            </div>

            {/* Antigüedad */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Antigüedad (años)
              </label>
              <input
                type="number"
                {...register("antiguedad", { valueAsNumber: true })}
                className="text-[#000] w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0"
                min="0"
              />
              {errors.antiguedad && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.antiguedad.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Estrato (solo para ciertos tipos de inmueble) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Estrato
            </label>
            <select
              {...register("estrato", { valueAsNumber: true })}
              className="text-[#000] w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Seleccionar estrato</option>
              <option value="1">Estrato 1</option>
              <option value="2">Estrato 2</option>
              <option value="3">Estrato 3</option>
              <option value="4">Estrato 4</option>
              <option value="5">Estrato 5</option>
              <option value="6">Estrato 6</option>
            </select>
            {errors.estrato && (
              <p className="text-red-500 text-sm mt-2">
                {errors.estrato.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Solo aplica para apartamentos, oficinas y locales comerciales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
