import { z } from "zod";

// Schema simplificado que funciona con react-hook-form
export const inmuebleSchema = z.object({
  // Campos de texto
  titulo: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título no debe exceder 200 caracteres"),

  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(2000, "La descripción no debe exceder 2000 caracteres"),

  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),

  ciudad: z.string().min(2, "La ciudad es requerida"),

  departamento: z.string().min(2, "El departamento es requerido"),

  // Enums
  tipo: z.enum([
    "APARTAMENTO",
    "CASA",
    "LOTE_URBANO",
    "PREDIO_RURAL",
    "FINCA",
    "OFICINA",
    "LOCAL_COMERCIAL",
    "BODEGA",
    "OTRO",
  ]),

  moneda: z.enum(["COP", "USD"]).default("COP"),

  areaUnidad: z
    .enum(["METROS_CUADRADOS", "HECTAREAS"])
    .default("METROS_CUADRADOS"),

  estado: z.enum(["DISPONIBLE", "VENDIDO", "RESERVADO"]).default("DISPONIBLE"),

  // CORREGIDO: Para react-hook-form, usar z.preprocess() para convertir string a number
  precio: z.preprocess(
    (val) => (val === "" || val === null ? undefined : Number(val)),
    z
      .number()
      .min(1, "El precio debe ser mayor a 0")
      .int("El precio debe ser un número entero")
  ),

  // Campos numéricos opcionales - CORREGIDO
  area: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z
      .number()
      .min(0, "El área debe ser mayor o igual a 0")
      .nullable()
      .optional()
  ),

  habitaciones: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z
      .number()
      .min(0, "Las habitaciones deben ser mayor o igual a 0")
      .int("Las habitaciones deben ser un número entero")
      .nullable()
      .optional()
  ),

  banos: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z
      .number()
      .min(0, "Los baños deben ser mayor o igual a 0")
      .int("Los baños deben ser un número entero")
      .nullable()
      .optional()
  ),

  pisos: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z
      .number()
      .min(0, "Los pisos deben ser mayor o igual a 0")
      .int("Los pisos deben ser un número entero")
      .nullable()
      .optional()
  ),

  antiguedad: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z
      .number()
      .min(0, "La antigüedad debe ser mayor o igual a 0")
      .int("La antigüedad debe ser un número entero")
      .nullable()
      .optional()
  ),

  estrato: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z
      .number()
      .min(1, "El estrato debe ser entre 1 y 6")
      .max(6, "El estrato debe ser entre 1 y 6")
      .int("El estrato debe ser un número entero")
      .nullable()
      .optional()
  ),

  lat: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z.number().nullable().optional()
  ),

  lng: z.preprocess(
    (val) => (val === "" || val === null ? null : Number(val)),
    z.number().nullable().optional()
  ),

  // Booleanos
  tieneGaraje: z.boolean().default(false),

  amoblado: z.boolean().default(false),

  destacado: z.boolean().default(false),

  // Campos de predio rural
  topografia: z
    .enum(["PLANA", "ONDULADA", "QUEBRADA", "MONTANOSA"])
    .nullable()
    .optional(),

  accesoAgua: z.boolean().default(false),

  accesoLuz: z.boolean().default(false),

  viaAcceso: z
    .enum(["PAVIMENTADA", "DESTAPADA", "TROCHA", "FLUVIAL"])
    .nullable()
    .optional(),

  cultivos: z.string().nullable().optional(),
});

export type InmuebleFormData = z.infer<typeof inmuebleSchema>;
