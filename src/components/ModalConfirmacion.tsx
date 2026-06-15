// components/ModalConfirmacion.tsx
// SRP: única responsabilidad → confirmar acciones destructivas.

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
  labelConfirmar = 'Confirmar',
  isPending = false,
  onConfirmar,
  onCancelar,
}: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-neutral-800/40 backdrop-blur-sm" onClick={onCancelar} />
    <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-danger-50 flex items-center justify-center flex-shrink-0">
          <i className="ti ti-alert-triangle text-danger-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-800">{titulo}</h3>
          <p className="text-xs text-neutral-400 mt-1">{descripcion}</p>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancelar}
          className="px-4 py-2 text-sm rounded border border-neutral-100 text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmar}
          disabled={isPending}
          className="px-4 py-2 text-sm rounded bg-danger-600 text-white hover:bg-danger-600/80 transition-colors disabled:opacity-60"
        >
          {isPending ? 'Procesando...' : labelConfirmar}
        </button>
      </div>
    </div>
  </div>
);