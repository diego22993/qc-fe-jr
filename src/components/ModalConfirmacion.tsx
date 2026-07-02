// components/ModalConfirmacion.tsx
// SRP: única responsabilidad → confirmar acciones destructivas/bajas.

interface Props {
  titulo: string;
  descripcion: string;
  labelConfirmar?: string;
  isPending?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export const ModalConfirmacion = ({
  titulo,
  descripcion,
  labelConfirmar = "Confirmar",
  isPending = false,
  onConfirmar,
  onCancelar,
}: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      onClick={onCancelar}
    />

    {/* Contenedor del Modal */}
    <div className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-6">
      <div className="flex items-start gap-4">
        {/* 🔴 NUEVO: Icono de usuario deshabilitado / bloqueo en Rojo Pastel */}
        <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
          <i className="ti ti-user-off text-brand-red-text text-lg" />
        </div>

        {/* Textos tipográficos usando tus variables semánticas */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-text-main">{titulo}</h3>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">
            {descripcion}
          </p>
        </div>
      </div>

      {/* Botones estilo UI limpia alineados a la convención UX */}
      <div className="flex justify-end gap-3">
        {/* Botón secundario neutral */}
        <button
          type="button"
          onClick={onCancelar}
          className="px-5 py-2 text-sm font-medium rounded-md border border-border-primary text-text-muted hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancelar
        </button>

        {/* 🔴 NUEVO: Botón principal de acción en Rojo Pastel */}
        <button
          type="button"
          onClick={onConfirmar}
          disabled={isPending}
          className="px-5 py-2 text-sm font-medium rounded-md bg-brand-red text-brand-red-text hover:bg-brand-red-hover transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Procesando..." : labelConfirmar}
        </button>
      </div>
    </div>
  </div>
);
