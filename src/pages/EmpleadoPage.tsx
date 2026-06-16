// src/pages/EmpleadoPage.tsx
// SRP: orquesta el módulo de empleados — fetching, filtros y tabla.
// Creator (GRASP): crea el estado de filtros y lo distribuye a los hijos.

import React from "react";
import { EmpleadoFiltros } from "../features/empleados/components/EmpleadoFiltros";
import { EmpleadoTable } from "../features/empleados/components/EmpleadoTable";
import { useEmpleados } from "../features/empleados/hooks/useEmpleados";
import { useEmpleadoFiltros } from "../features/empleados/hooks/useEmpleadoFiltros";

export const EmpleadoPage: React.FC = () => {
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
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-base font-medium text-neutral-800">Empleados</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Gestión del personal registrado en el sistema
        </p>
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
    </div>
  );
};
