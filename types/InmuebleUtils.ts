import { InmuebleInitialData } from "./InmuebleTypes";
import { InmuebleFormData } from "@/lib/schemas/inmueble";

export const parseInitialData = (
  data: InmuebleInitialData
): Partial<InmuebleFormData> => {
  // Convertir valores a los tipos correctos según Prisma
  return {
    titulo: data.titulo || "",
    descripcion: data.descripcion || "",
    tipo: (data.tipo as InmuebleFormData["tipo"]) || "APARTAMENTO",
    precio: data.precio || 0,
    moneda: (data.moneda as InmuebleFormData["moneda"]) || "COP",
    area: data.area ?? null,
    areaUnidad:
      (data.areaUnidad as InmuebleFormData["areaUnidad"]) || "METROS_CUADRADOS",
    habitaciones: data.habitaciones ?? null,
    banos: data.banos ?? null,
    pisos: data.pisos ?? null,
    antiguedad: data.antiguedad ?? null,
    estrato: data.estrato ?? null,
    tieneGaraje: data.tieneGaraje || false,
    amoblado: data.amoblado || false,
    direccion: data.direccion || "",
    ciudad: data.ciudad || "",
    departamento: data.departamento || "",
    lat: data.lat ?? null,
    lng: data.lng ?? null,
    estado: (data.estado as InmuebleFormData["estado"]) || "DISPONIBLE",
    destacado: data.destacado || false,
    topografia: data.topografia as InmuebleFormData["topografia"] | null,
    accesoAgua: data.accesoAgua || false,
    accesoLuz: data.accesoLuz || false,
    viaAcceso: data.viaAcceso as InmuebleFormData["viaAcceso"] | null,
    cultivos: data.cultivos ?? null,
  };
};

export const sanitizeFormData = (
  data: InmuebleFormData
): Record<string, unknown> => {
  const sanitized: Record<string, unknown> = { ...data };

  // Convertir null a undefined para campos opcionales (como los espera Prisma)
  const optionalFields: Array<keyof InmuebleFormData> = [
    "area",
    "habitaciones",
    "banos",
    "pisos",
    "antiguedad",
    "estrato",
    "lat",
    "lng",
    "topografia",
    "viaAcceso",
    "cultivos",
  ];

  optionalFields.forEach((field) => {
    if (
      sanitized[field] === null ||
      sanitized[field] === "" ||
      sanitized[field] === undefined
    ) {
      sanitized[field] = null; // Mantener null para Prisma
    }
  });

  // Asegurar que precio sea Int
  if (typeof sanitized.precio === "number") {
    sanitized.precio = Math.round(sanitized.precio);
  }

  // Asegurar que los campos Int sean enteros
  const intFields = ["habitaciones", "banos", "pisos", "antiguedad", "estrato"];
  intFields.forEach((field) => {
    if (typeof sanitized[field] === "number") {
      sanitized[field] = Math.round(sanitized[field] as number);
    }
  });

  return sanitized;
};
