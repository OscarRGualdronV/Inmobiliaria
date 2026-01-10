import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { InmuebleFormData } from "@/lib/schemas/inmueble";

export interface InmuebleInitialData {
  id?: number;
  titulo?: string;
  descripcion?: string;
  tipo?: string;
  precio?: number; // Int
  moneda?: string;
  area?: number | null; // Float?
  areaUnidad?: string;
  habitaciones?: number | null; // Int?
  banos?: number | null; // Int?
  pisos?: number | null; // Int?
  antiguedad?: number | null; // Int?
  estrato?: number | null; // Int?
  tieneGaraje?: boolean;
  amoblado?: boolean;
  direccion?: string;
  ciudad?: string;
  departamento?: string;
  lat?: number | null; // Float?
  lng?: number | null; // Float?
  estado?: string;
  destacado?: boolean;
  imagenes?: string[];
  topografia?: string | null;
  accesoAgua?: boolean;
  accesoLuz?: boolean;
  viaAcceso?: string | null;
  cultivos?: string | null;
}

export interface InmuebleFormProps {
  vendedorId: number;
  inmuebleId?: number;
  initialData?: InmuebleInitialData;
}

export interface FormSectionProps {
  register: UseFormRegister<InmuebleFormData>;
  errors: FieldErrors<InmuebleFormData>;
  watch?: UseFormWatch<InmuebleFormData>;
  tipoSeleccionado?: string;
}

export interface PredioRuralProps {
  register: UseFormRegister<InmuebleFormData>;
  errors?: FieldErrors<InmuebleFormData>;
}

export interface ImagenesProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}