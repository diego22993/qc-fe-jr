// components/Modal.tsx
// SRP: única responsabilidad → contenedor modal reutilizable.

interface Props {
  titulo: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ titulo, onClose, children }: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-neutral-800/40 backdrop-blur-sm"
      onClick={onClose}
    />
    {/* Panel */}
    <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <h2 className="text-sm font-medium text-neutral-800">{titulo}</h2>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <i className="ti ti-x text-base" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);