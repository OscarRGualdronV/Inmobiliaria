import Image from "next/image";

export const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  images: string[],
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setMessage: React.Dispatch<
    React.SetStateAction<{
      type: "success" | "error";
      text: string;
    } | null>
  >
) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);

    // Validar cantidad máxima
    if (images.length + files.length > 10) {
      setMessage({ type: "error", text: "Máximo 10 imágenes por propiedad" });
      return;
    }

    // Validar tipo y tamaño
    const invalidFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      );
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
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

    // Crear previews locales
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

export const removeImage = (
  index: number,
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>
) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
  setImageFiles((prev) => prev.filter((_, i) => i !== index));
};

export const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
  if (imageFiles.length === 0) return [];

  const uploadedUrls: string[] = [];
  const CLOUD_NAME = "drslkjlap";
  const UPLOAD_PRESET = "inmobiliaria_preset";

  for (const file of imageFiles) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      uploadedUrls.push(data.secure_url);
      console.log("Imagen subida exitosamente:", data.secure_url);
    } catch (error) {
      console.error("Error subiendo imagen a Cloudinary:", error);
      throw new Error("Error al subir imágenes a Cloudinary");
    }
  }

  return uploadedUrls;
};

export const ImagePreview = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="w-full h-32 relative rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
        className="object-cover"
      />
    </div>
  );
};
