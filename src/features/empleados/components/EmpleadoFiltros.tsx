// features/empleados/components/EmpleadoFiltros.tsx
// SRP: única responsabilidad → renderizar los controles de filtrado.
// Recibe estado y setters como props — no conoce la lógica de filtrado.

import type { FiltrosEmpleado } from "../hooks/useEmpleadoFiltros";

interface EmpleadoFiltrosProps {
  filtros: FiltrosEmpleado;
  onNombre: (v: string) => void;
  onEstado: (v: FiltrosEmpleado["estado"]) => void;
  onFechaDesde: (v: string) => void;
  onFechaHasta: (v: string) => void;
  onLimpiar: () => void;
  hayFiltros: boolean;
}

export const EmpleadoFiltros = ({
  filtros,
  onNombre,
  onEstado,
  onFechaDesde,
  onFechaHasta,
  onLimpiar,
  hayFiltros,
}: EmpleadoFiltrosProps) => {
  return (
    <div className="bg-white border border-neutral-100 rounded-lg px-5 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Nombre</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={filtros.nombre}
              onChange={(e) => onNombre(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 transition-colors"
            />
          </div>
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Estado</label>
          <select
            value={filtros.estado}
            onChange={(e) =>
              onEstado(e.target.value as FiltrosEmpleado["estado"])
            }
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 transition-colors bg-white"
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Fecha desde */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Ingreso desde</label>
          <input
            type="date"
            value={filtros.fechaDesde}
            onChange={(e) => onFechaDesde(e.target.value)}
            max={filtros.fechaHasta || undefined}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 transition-colors"
          />
        </div>

        {/* Fecha hasta */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Ingreso hasta</label>
          <input
            type="date"
            value={filtros.fechaHasta}
            onChange={(e) => onFechaHasta(e.target.value)}
            min={filtros.fechaDesde || undefined}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 transition-colors"
          />
        </div>
      </div>

      {/* Botón limpiar — solo visible cuando hay filtros activos */}
      {hayFiltros && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onLimpiar}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-danger-600 transition-colors px-3 py-1.5 rounded border border-neutral-200 hover:border-danger-200 hover:bg-danger-50"
          >
            ✕ Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};
