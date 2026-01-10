export const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "drslkjlap";
  const UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "inmobiliaria_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudinary response error:", errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Imagen subida exitosamente:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const uploadMultipleToCloudinary = async (
  files: File[]
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadToCloudinary(file));
  return Promise.all(uploadPromises);
};

// Función para extraer public_id de una URL de Cloudinary
export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    // URL de Cloudinary: https://res.cloudinary.com/cloudname/image/upload/v1234567890/folder/filename.jpg
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.\w+$/);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};


export const deleteFromCloudinary = async (): Promise<void> => {
  console.warn(
    "Función deleteFromCloudinary no implementada. Necesita configuración server-side."
  );
  throw new Error(
    "Eliminación de imágenes requiere configuración server-side por seguridad."
  );
};

// Función helper para convertir File a base64 (opcional)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Función para validar tipos de archivo
export const isValidImageType = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  return validTypes.includes(file.type);
};

// Función para validar tamaño de archivo (en MB)
export const isValidImageSize = (file: File, maxSizeMB = 5): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};
