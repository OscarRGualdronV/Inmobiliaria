"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inmuebleSchema, type InmuebleFormData } from "@/lib/schemas/inmueble";
import { type InmuebleFormProps } from "@/types/InmuebleTypes";
import { parseInitialData, sanitizeFormData } from "@/types/InmuebleUtils";
import { uploadImages } from "@/types/ImageHandler";
import InformacionBasica from "@/components/sections/InformacionBasica";
import PrecioCaracteristicas from "@/components/sections/PrecioCaracteristicas";
import Ubicacion from "@/components/sections/Ubicacion";
import PredioRural from "@/components/sections/PredioRural";
import Imagenes from "@/components/sections/Imagenes";
import EstadoPublicacion from "@/components/sections/EstadoPublicacion";
import FormMessage from "@/components/ui/FormMessage";
import FormButtons from "@/components/ui/FormButtons";

export default function InmuebleForm({
  vendedorId,
  inmuebleId,
  initialData,
}: InmuebleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [images, setImages] = useState<string[]>(initialData?.imagenes || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InmuebleFormData>({
    resolver: zodResolver(inmuebleSchema as never),
    defaultValues: initialData
      ? parseInitialData(initialData)
      : {
          tipo: "APARTAMENTO",
          moneda: "COP",
          precio: 0,
          areaUnidad: "METROS_CUADRADOS",
          estado: "DISPONIBLE",
          tieneGaraje: false,
          amoblado: false,
          destacado: false,
          accesoAgua: false,
          accesoLuz: false,
          area: null,
          habitaciones: null,
          banos: null,
          pisos: null,
          antiguedad: null,
          estrato: null,
          lat: null,
          lng: null,
          topografia: null,
          viaAcceso: null,
          cultivos: null,
        },
  });

  const tipoSeleccionado = watch("tipo");
  const esPredioRural =
    tipoSeleccionado === "PREDIO_RURAL" || tipoSeleccionado === "FINCA";

  // Manejar subida de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (images.length + files.length > 10) {
        setMessage({ type: "error", text: "Máximo 10 imágenes por propiedad" });
        return;
      }

      const invalidFiles = files.filter((file) => {
        const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(
          file.type
        );
        const isValidSize = file.size <= 5 * 1024 * 1024;
        return !isValidType || !isValidSize;
      });

      if (invalidFiles.length > 0) {
        setMessage({
          type: "error",
          text: "Algunas imágenes no son válidas. Solo se permiten JPG, PNG, WebP hasta 5MB",
        });
        return;
      }

      setImageFiles((prev) => [...prev, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // CORRECCIÓN: onSubmit sin tipado explícito
  const onSubmit = async (data: InmuebleFormData) => {
    setLoading(true);
    setMessage(null);

    try {
      let imageUrls: string[] = [];

      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles);
      }

      const todasImagenes = [
        ...images.filter((img) => !img.startsWith("data:")),
        ...imageUrls,
      ];

      const sanitizedData = sanitizeFormData(data);

      const inmuebleData = {
        ...sanitizedData,
        imagenes: todasImagenes,
        vendedorId: vendedorId,
      };

      const url = inmuebleId
        ? `/api/inmuebles/${inmuebleId}`
        : "/api/inmuebles";
      const method = inmuebleId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inmuebleData),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: inmuebleId
            ? "Inmueble actualizado correctamente"
            : "Inmueble creado correctamente",
        });

        setTimeout(() => {
          router.push("/dashboard/inmuebles");
          router.refresh();
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.error || "Error al guardar",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormMessage message={message} />

      <InformacionBasica register={register} errors={errors} />

      <PrecioCaracteristicas
        register={register}
        errors={errors}
        watch={watch}
      />

      <Ubicacion
        register={register}
        errors={errors}
        tipoSeleccionado={tipoSeleccionado}
      />

      {esPredioRural && <PredioRural register={register} errors={errors} />}

      <Imagenes
        images={images}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
      />

      <EstadoPublicacion register={register} errors={errors} />

      <FormButtons
        loading={loading}
        onCancel={() => router.push("/dashboard/inmuebles")}
      />
    </form>
  );
}