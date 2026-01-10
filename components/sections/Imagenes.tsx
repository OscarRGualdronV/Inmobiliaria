"use client";

import { Upload, X } from "lucide-react";
import { ImagePreview } from "@/types/ImageHandler";
import { ImagenesProps } from "@/types/InmuebleTypes";

export default function Imagenes({
  images,
  onImageUpload,
  onRemoveImage,
}: ImagenesProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        5. Imágenes
      </h2>

      {/* Área de carga */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subir imágenes{" "}
          <span className="text-gray-500 text-sm">
            (Máximo 10 imágenes, JPG/PNG/WebP, hasta 5MB cada una)
          </span>
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Subir archivos</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={onImageUpload}
                  className="sr-only"
                  disabled={images.length >= 10}
                />
              </label>
              <p className="pl-1">o arrastrar y soltar</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WebP hasta 5MB</p>
            {images.length >= 10 && (
              <p className="text-xs text-red-500 mt-2">
                Límite de 10 imágenes alcanzado
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Vista previa de imágenes */}
      {images.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Vista previa ({images.length} imágenes)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                {/* Renderizar preview */}
                {img.startsWith("data:") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <ImagePreview src={img} alt={`Preview ${index + 1}`} />
                )}
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                  {index === 0 ? "Portada" : `Imagen ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
