import { PredioRuralProps } from "@/types/InmuebleTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PredioRural({ register, errors }: PredioRuralProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        4. Características del Predio Rural
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topografía */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topografía
          </label>
          <select
            {...register("topografia")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar</option>
            <option value="PLANA">Plana</option>
            <option value="ONDULADA">Ondulada</option>
            <option value="QUEBRADA">Quebrada</option>
            <option value="MONTANOSA">Montañosa</option>
          </select>
        </div>

        {/* Vía de Acceso */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vía de Acceso
          </label>
          <select
            {...register("viaAcceso")}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar</option>
            <option value="PAVIMENTADA">Pavimentada</option>
            <option value="DESTAPADA">Destapada</option>
            <option value="TROCHA">Trocha</option>
            <option value="FLUVIAL">Fluvial</option>
          </select>
        </div>

        {/* Cultivos */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cultivos Existentes
          </label>
          <input
            type="text"
            {...register("cultivos")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Café, Aguacate, Plátano, Cítricos"
          />
        </div>

        {/* Servicios */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("accesoAgua")}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">Acceso a agua</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("accesoLuz")}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">
                Acceso a energía eléctrica
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}