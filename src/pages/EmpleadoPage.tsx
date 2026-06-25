// src/pages/EmpleadoPage.tsx
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { EmpleadoFiltros } from "../features/empleados/components/EmpleadoFiltros";
import { EmpleadoTable } from "../features/empleados/components/EmpleadoTable";
import { useEmpleados } from "../features/empleados/hooks/useEmpleados";
import { useEmpleadoFiltros } from "../features/empleados/hooks/useEmpleadoFiltros";

export const EmpleadoPage: React.FC = () => {
  const navigate = useNavigate();

  // 🟢 React Query puro: no tira error de typings porque no desestructuramos lo que no existe
  const { empleados, isLoading, isError } = useEmpleados();

  const {
    filtros,
    setNombre,
    setEstado,
    setFechaDesde,
    setFechaHasta,
    limpiarFiltros,
    empleadosFiltrados,
    totalOriginal,
    hayFiltros,
  } = useEmpleadoFiltros(empleados);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400 text-sm">
        Cargando empleados...
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center py-16 text-danger-600 text-sm">
        Error al cargar los empleados. Verificá que el servidor esté corriendo.
      </div>
    );

  return (
    <div className="flex flex-col gap-4 relative">
      {/* Cabecera alineada con el botón arriba a la derecha */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-base font-medium text-neutral-800">Empleados</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Gestión del personal registrado en el sistema
          </p>
        </div>

        <button
          onClick={() => navigate("/empleados/nuevo")}
          className="flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-xs active:scale-95"
        >
          <i className="ti ti-plus text-base" />
          Nuevo Empleado
        </button>
      </div>

      <EmpleadoFiltros
        filtros={filtros}
        onNombre={setNombre}
        onEstado={setEstado}
        onFechaDesde={setFechaDesde}
        onFechaHasta={setFechaHasta}
        onLimpiar={limpiarFiltros}
        hayFiltros={hayFiltros}
      />

      <EmpleadoTable
        empleados={empleadosFiltrados}
        totalOriginal={totalOriginal}
      />

      {/* El Outlet ya no necesita enviar ningún context complejo */}
      <Outlet />
    </div>
  );
};
