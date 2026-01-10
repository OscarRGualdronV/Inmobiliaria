import { Loader2 } from "lucide-react";

interface FormButtonsProps {
  loading: boolean;
  onCancel: () => void;
}

export default function FormButtons({ loading, onCancel }: FormButtonsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        disabled={loading}
      >
        Cancelar
      </button>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center min-w-[140px]"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Guardando...
          </>
        ) : (
          "Guardar Inmueble"
        )}
      </button>
    </div>
  );
}
