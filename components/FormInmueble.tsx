"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inmueble } from "@prisma/client";
import Image from "next/image";
import { uploadToCloudinary, getPublicIdFromUrl } from "@/lib/cloudinary";

interface FormInmuebleProps {
  inmueble?: Inmueble | null;
}

export default function FormInmueble({ inmueble }: FormInmuebleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Estados para las imágenes
  const [images, setImages] = useState<string[]>(inmueble?.imagenes || []);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const tiposInmueble = [
    "APARTAMENTO",
    "CASA",
    "LOTE_URBANO",
    "PREDIO_RURAL",
    "FINCA",
    "OFICINA",
    "LOCAL_COMERCIAL",
    "BODEGA",
    "OTRO",
  ];

  const estadosInmueble = ["DISPONIBLE", "VENDIDO", "RESERVADO"];
  const monedas = ["COP", "USD"];
  const unidadesArea = ["METROS_CUADRADOS", "HECTAREAS"];
  const topografias = ["PLANA", "ONDULADA", "QUEBRADA", "MONTANOSA"];
  const viasAcceso = ["PAVIMENTADA", "DESTAPADA", "TROCHA", "FLUVIAL"];

  // ============ FUNCIONES PARA IMÁGENES ============

  // Manejar selección de archivos
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const fileArray = Array.from(files);

      // Validar cantidad máxima
      if (images.length + fileArray.length > 10) {
        setError("Máximo 10 imágenes permitidas");
        setUploading(false);
        return;
      }

      // Subir cada archivo a Cloudinary
      const uploadPromises = fileArray.map((file) => uploadToCloudinary(file));
      const newImageUrls = await Promise.all(uploadPromises);

      // Agregar nuevas imágenes al estado
      setImages((prev) => [...prev, ...newImageUrls]);
    } catch (err) {
      setError(
        "Error al subir las imágenes. Asegúrate de que sean imágenes válidas (JPG, PNG, WEBP) y menores a 5MB."
      );
      console.error("Error uploading images:", err);
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset input
    }
  };

  // Eliminar imagen
  const handleRemoveImage = (index: number, imageUrl: string) => {
    // Agregar a la lista de imágenes para eliminar de Cloudinary
    setImagesToDelete((prev) => [...prev, imageUrl]);

    // Eliminar del estado de visualización
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Reordenar imágenes (primera imagen es la principal)
  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;

    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  // Eliminar todas las imágenes
  const handleRemoveAllImages = () => {
    // Agregar todas las imágenes actuales a la lista de eliminación
    setImagesToDelete((prev) => [...prev, ...images]);
    // Limpiar todas las imágenes
    setImages([]);
  };

  // ============ HANDLE SUBMIT ORIGINAL (con imágenes agregadas) ============

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Destacado antes:", data.destacado);
    console.log("Tipo de dato", typeof data.destacado);

    try {
      if (imagesToDelete.length > 0) {
        const publicIds = imagesToDelete
          .map((url) => getPublicIdFromUrl(url))
          .filter(Boolean);

        if (publicIds.length > 0) {
          await fetch("/api/cloudinary/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicIds }),
          });
        }
      }

      // 2. Preparar datos para enviar a la API (TU CÓDIGO ORIGINAL)
      const parsedData = {
        ...data,
        precio: parseInt(data.precio as string),
        area: data.area ? parseFloat(data.area as string) : null,
        habitaciones: data.habitaciones
          ? parseInt(data.habitaciones as string)
          : null,
        banos: data.banos ? parseInt(data.banos as string) : null,
        pisos: data.pisos ? parseInt(data.pisos as string) : null,
        antiguedad: data.antiguedad
          ? parseInt(data.antiguedad as string)
          : null,
        estrato: data.estrato ? parseInt(data.estrato as string) : null,
        tieneGaraje: data.tieneGaraje === "on",
        amoblado: data.amoblado === "on",
        destacado: data.destacado === "on",
        accesoAgua: data.accesoAgua === "on",
        accesoLuz: data.accesoLuz === "on",
        lat: data.lat ? parseFloat(data.lat as string) : null,
        lng: data.lng ? parseFloat(data.lng as string) : null,
        // ✅ CAMBIO: Usar las imágenes del estado en lugar de las originales
        imagenes: images,
      };

      const url = inmueble ? `/api/inmuebles/${inmueble.id}` : "/api/inmuebles";
      const method = inmueble ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el inmueble");
      }

      // Limpiar lista de imágenes a eliminar después del éxito
      setImagesToDelete([]);

      router.push("/dashboard/inmuebles");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md">{error}</div>
      )}

      {/* ============ SECCIÓN DE IMÁGENES (NUEVA) ============ */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900">
          Imágenes del inmueble
        </h3>
        <p className="text-sm text-gray-600">
          La primera imagen será la principal. Puedes subir hasta 10 imágenes.
        </p>

        {/* Mostrar imágenes existentes */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div key={`${url}-${index}`} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Overlay con controles */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, url)}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      title="Eliminar imagen"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(index, index - 1)}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        title="Mover hacia arriba"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                    )}

                    {index < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(index, index + 1)}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        title="Mover hacia abajo"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Indicador de imagen principal */}
                <div className="text-xs text-center mt-1">
                  {index === 0 ? (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Principal
                    </span>
                  ) : (
                    <span className="text-gray-500">Foto {index + 1}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Área para subir nuevas imágenes */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            uploading
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <label className="cursor-pointer block">
            {uploading ? (
              <div className="space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600">Subiendo imágenes...</p>
                <p className="text-sm text-gray-500">Por favor espera</p>
              </div>
            ) : (
              <>
                <div className="text-4xl mb-2">📁</div>
                <p className="text-gray-600 mb-1">
                  Haz clic para seleccionar imágenes
                </p>
                <p className="text-sm text-gray-500">
                  o arrastra y suelta aquí
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  PNG, JPG, WEBP hasta 5MB ({images.length}/10 imágenes)
                </p>
              </>
            )}

            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              disabled={uploading || images.length >= 10}
              className="hidden"
            />
          </label>
        </div>

        {/* Contador de imágenes */}
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>
            {images.length === 0
              ? "No hay imágenes"
              : `${images.length} imagen(es)`}
          </span>
          {images.length > 0 && (
            <button
              type="button"
              onClick={handleRemoveAllImages}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Eliminar todas
            </button>
          )}
        </div>
      </div>

      {/* ============ TU CÓDIGO ORIGINAL (TODO LO DEMÁS) ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Básica */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Información Básica
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              defaultValue={inmueble?.titulo || ""}
              required
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo *
            </label>
            <select
              name="tipo"
              defaultValue={inmueble?.tipo || "APARTAMENTO"}
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {tiposInmueble.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo.replace("_", " ").toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              defaultValue={inmueble?.descripcion || ""}
              rows={3}
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Precio y Estado */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Precio y Estado</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <input
                type="number"
                name="precio"
                defaultValue={inmueble?.precio || ""}
                required
                className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moneda
              </label>
              <select
                name="moneda"
                defaultValue={inmueble?.moneda || "COP"}
                className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {monedas.map((moneda) => (
                  <option key={moneda} value={moneda}>
                    {moneda}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="estado"
              defaultValue={inmueble?.estado || "DISPONIBLE"}
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {estadosInmueble.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="destacado"
                defaultChecked={inmueble?.destacado || false}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Destacado</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="tieneGaraje"
                defaultChecked={inmueble?.tieneGaraje || false}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Garaje</span>
            </label>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Área
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="area"
              step="0.01"
              defaultValue={inmueble?.area || ""}
              className="text-[#000] flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <select
              name="areaUnidad"
              defaultValue={inmueble?.areaUnidad || "METROS_CUADRADOS"}
              className=" text-[#000] px-3 py-2 border border-gray-300 rounded-md"
            >
              {unidadesArea.map((unidad) => (
                <option key={unidad} value={unidad}>
                  {unidad === "METROS_CUADRADOS" ? "m²" : "hectáreas"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Habitaciones
          </label>
          <input
            type="number"
            name="habitaciones"
            defaultValue={inmueble?.habitaciones || ""}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Baños
          </label>
          <input
            type="number"
            name="banos"
            defaultValue={inmueble?.banos || ""}
            className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Ubicación */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Ubicación</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <input
              type="text"
              name="ciudad"
              defaultValue={inmueble?.ciudad || ""}
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento
            </label>
            <input
              type="text"
              name="departamento"
              defaultValue={inmueble?.departamento || ""}
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              defaultValue={inmueble?.direccion || ""}
              className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Campos para Predios Rurales */}
      {(inmueble?.tipo === "PREDIO_RURAL" || inmueble?.tipo === "FINCA") && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">
            Características Rurales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topografía
              </label>
              <select
                name="topografia"
                defaultValue={inmueble?.topografia || "PLANA"}
                className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccionar</option>
                {topografias.map((topografia) => (
                  <option key={topografia} value={topografia}>
                    {topografia.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vía de Acceso
              </label>
              <select
                name="viaAcceso"
                defaultValue={inmueble?.viaAcceso || "PAVIMENTADA"}
                className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccionar</option>
                {viasAcceso.map((via) => (
                  <option key={via} value={via}>
                    {via.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cultivos
              </label>
              <input
                type="text"
                name="cultivos"
                defaultValue={inmueble?.cultivos || ""}
                placeholder="Ej: Café, plátano, caña"
                className=" text-[#000] w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="accesoAgua"
                  defaultChecked={inmueble?.accesoAgua || false}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Acceso a Agua
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="accesoLuz"
                  defaultChecked={inmueble?.accesoLuz || false}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Acceso a Luz</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : uploading
            ? "Subiendo imágenes..."
            : inmueble
            ? "Actualizar"
            : "Crear"}
        </button>
      </div>
    </form>
  );
}
