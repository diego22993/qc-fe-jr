// features/empleados/hooks/useEmpleadoFiltros.ts
// SRP: única responsabilidad → estado de filtros + lógica de filtrado en memoria.

import { useState, useMemo, useEffect } from "react";
import type { Empleado } from "../types/empleado.types";

export interface FiltrosEmpleado {
  nombre: string;
  estado: "todos" | "activo" | "inactivo";
  fechaDesde: string;
  fechaHasta: string;
}

const FILTROS_INICIALES: FiltrosEmpleado = {
  nombre: "",
  estado: "todos",
  fechaDesde: "",
  fechaHasta: "",
};

const hayFiltrosActivos = (f: FiltrosEmpleado): boolean =>
  f.nombre !== "" ||
  f.estado !== "todos" ||
  f.fechaDesde !== "" ||
  f.fechaHasta !== "";

// Debounce genérico
const useDebounce = <T>(value: T, delay: number): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

export const useEmpleadoFiltros = (empleados: Empleado[]) => {
  const [filtros, setFiltros] = useState<FiltrosEmpleado>(FILTROS_INICIALES);

  // Solo el nombre usa debounce (es el campo de texto libre)
  const nombreDebounced = useDebounce(filtros.nombre, 300);

  const empleadosFiltrados = useMemo(() => {
    return empleados.filter((emp) => {
      // Filtro por nombre (usa el valor debounced)
      if (nombreDebounced.trim() !== "") {
        const nombreCompleto = `${emp.nombre} ${emp.apellido}`.toLowerCase();
        if (!nombreCompleto.includes(nombreDebounced.trim().toLowerCase())) {
          return false;
        }
      }

      // Filtro por estado
      if (filtros.estado === "activo" && !emp.active) return false;
      if (filtros.estado === "inactivo" && emp.active) return false;

      // Filtro por rango de fecha de ingreso
      const fechaIngreso = new Date(emp.fechaIngreso).getTime();
      if (filtros.fechaDesde !== "") {
        const desde = new Date(filtros.fechaDesde).getTime();
        if (fechaIngreso < desde) return false;
      }
      if (filtros.fechaHasta !== "") {
        // Hasta el final del día seleccionado
        const hasta = new Date(filtros.fechaHasta);
        hasta.setHours(23, 59, 59, 999);
        if (fechaIngreso > hasta.getTime()) return false;
      }

      return true;
    });
  }, [
    empleados,
    nombreDebounced,
    filtros.estado,
    filtros.fechaDesde,
    filtros.fechaHasta,
  ]);

  const limpiarFiltros = () => setFiltros(FILTROS_INICIALES);

  const setNombre = (v: string) => setFiltros((f) => ({ ...f, nombre: v }));
  const setEstado = (v: FiltrosEmpleado["estado"]) =>
    setFiltros((f) => ({ ...f, estado: v }));
  const setFechaDesde = (v: string) =>
    setFiltros((f) => ({ ...f, fechaDesde: v }));
  const setFechaHasta = (v: string) =>
    setFiltros((f) => ({ ...f, fechaHasta: v }));

  return {
    filtros,
    setNombre,
    setEstado,
    setFechaDesde,
    setFechaHasta,
    limpiarFiltros,
    empleadosFiltrados,
    totalOriginal: empleados.length,
    hayFiltros: hayFiltrosActivos(filtros),
  };
};
