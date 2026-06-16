// features/empleados/components/EmpleadoTable.tsx
// SRP: única responsabilidad → renderizar el listado de empleados.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Modal";
import { ModalConfirmacion } from "../../../components/ModalConfirmacion";
import { EmpleadoEditForm } from "./EmpleadoEditForm";
import { useBajaEmpleado } from "../hooks/useEmpleados";
import { usePermisos } from "../../auth/hooks/usePermisos";
import type { Empleado } from "../types/empleado.types";

// ─── Badges ──────────────────────────────────────────────────────────────────

const RolBadge = ({ rol }: { rol: string }) => {
  const colores: Record<string, string> = {
    Veterinario: "bg-primary-50 text-primary-600",
    Recepcionista: "bg-warning-50 text-warning-600",
    Administrativo: "bg-neutral-100 text-neutral-600",
    Auxiliar: "bg-success-50 text-success-600",
  };
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${colores[rol] ?? "bg-neutral-100 text-neutral-600"}`}
    >
      {rol}
    </span>
  );
};

const EstadoBadge = ({ active }: { active: boolean }) => (
  <span
    className={`text-xs px-3 py-1 rounded-full font-medium ${active ? "bg-success-50 text-success-600" : "bg-danger-50 text-danger-600"}`}
  >
    {active ? "Activo" : "Inactivo"}
  </span>
);

const formatFecha = (fecha: string) =>
  new Date(fecha).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

// ─── Botón de acción ─────────────────────────────────────────────────────────

interface AccionBtnProps {
  label: string;
  icon: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

const AccionBtn = ({
  label,
  icon,
  onClick,
  variant = "default",
}: AccionBtnProps) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    onClick={onClick}
    className={`w-8 h-8 flex items-center justify-center rounded transition-colors
      ${
        variant === "danger"
          ? "text-danger-500 hover:bg-danger-50 hover:text-danger-700"
          : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
      }`}
  >
    {icon}
  </button>
);

// ─── Fila ────────────────────────────────────────────────────────────────────

interface FilaEmpleadoProps {
  empleado: Empleado;
  onVer: (e: Empleado) => void;
  onEditar: (e: Empleado) => void;
  onBaja: (e: Empleado) => void;
  puedeEditar: boolean;
  puedeBorrar: boolean;
}

const FilaEmpleado = ({
  empleado,
  onVer,
  onEditar,
  onBaja,
  puedeEditar,
  puedeBorrar,
}: FilaEmpleadoProps) => (
  <tr className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
    <td className="px-5 py-3 font-medium text-neutral-800">
      {empleado.nombre} {empleado.apellido}
    </td>
    <td className="px-4 py-3">
      <RolBadge rol={empleado.rol} />
    </td>
    <td className="px-4 py-3 text-neutral-600">{empleado.email}</td>
    <td className="px-4 py-3 text-neutral-600">{empleado.telefono}</td>
    <td className="px-4 py-3 text-neutral-600">
      {formatFecha(empleado.fechaIngreso)}
    </td>
    <td className="px-4 py-3">
      <EstadoBadge active={empleado.active} />
    </td>

    {/* ── Columna Acción ── */}
    <td className="px-4 py-3">
      <div className="flex items-center gap-1">
        {/* Ver — disponible para todos los roles */}
        <AccionBtn
          label="Ver detalle"
          icon="👁️"
          onClick={() => onVer(empleado)}
        />

        {/* Editar — solo Admin */}
        {puedeEditar ? (
          <AccionBtn
            label="Editar"
            icon="✏️"
            onClick={() => onEditar(empleado)}
          />
        ) : (
          <span className="w-8 h-8" aria-hidden="true" />
        )}

        {/* Dar de baja — solo Admin */}
        {puedeBorrar ? (
          <AccionBtn
            label="Dar de baja"
            icon="🗑️"
            onClick={() => onBaja(empleado)}
            variant="danger"
          />
        ) : (
          <span className="w-8 h-8" aria-hidden="true" />
        )}
      </div>
    </td>
  </tr>
);

// ─── Props tabla ─────────────────────────────────────────────────────────────

interface EmpleadoTableProps {
  empleados: Empleado[];
  totalOriginal: number;
}

// ─── Tabla principal ─────────────────────────────────────────────────────────

export const EmpleadoTable = ({
  empleados,
  totalOriginal,
}: EmpleadoTableProps) => {
  const navigate = useNavigate();
  const { puedeEditar, puedeBorrar } = usePermisos();

  const [empleadoEditar, setEmpleadoEditar] = useState<Empleado | null>(null);
  const [empleadoBaja, setEmpleadoBaja] = useState<Empleado | null>(null);

  const { mutate: darBaja, isPending } = useBajaEmpleado(() =>
    setEmpleadoBaja(null),
  );
  const hayFiltroActivo = empleados.length !== totalOriginal;

  if (empleados.length === 0)
    return (
      <div className="bg-white border border-neutral-100 rounded-lg flex items-center justify-center py-16">
        <p className="text-neutral-400 text-sm">
          {hayFiltroActivo
            ? "No hay empleados que coincidan con los filtros aplicados."
            : "No hay empleados registrados todavía."}
        </p>
      </div>
    );

  return (
    <>
      <div className="bg-white border border-neutral-100 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-neutral-800">
            Empleados registrados
          </h2>
          <span className="text-xs bg-neutral-50 border border-neutral-100 px-3 py-1 rounded-full text-neutral-600">
            {hayFiltroActivo
              ? `${empleados.length} de ${totalOriginal} registros`
              : `${totalOriginal} ${totalOriginal === 1 ? "registro" : "registros"}`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-neutral-50">
                <th className="text-left px-5 py-3 font-medium text-neutral-600">
                  Nombre
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Rol
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Teléfono
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Ingreso
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Estado
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <FilaEmpleado
                  key={emp.id}
                  empleado={emp}
                  onVer={(e) => navigate(`/empleados/${e.id}`)}
                  onEditar={(e) => setEmpleadoEditar(e)}
                  onBaja={(e) => setEmpleadoBaja(e)}
                  puedeEditar={puedeEditar}
                  puedeBorrar={puedeBorrar}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {empleadoEditar && (
        <Modal
          titulo={`Editar — ${empleadoEditar.nombre} ${empleadoEditar.apellido}`}
          onClose={() => setEmpleadoEditar(null)}
        >
          <EmpleadoEditForm
            empleado={empleadoEditar}
            onSuccess={() => setEmpleadoEditar(null)}
            onCancel={() => setEmpleadoEditar(null)}
          />
        </Modal>
      )}

      {empleadoBaja && (
        <ModalConfirmacion
          titulo="Dar de baja empleado"
          descripcion={`¿Confirmás la baja de ${empleadoBaja.nombre} ${empleadoBaja.apellido}? El empleado quedará inactivo en el sistema.`}
          labelConfirmar="Dar de baja"
          isPending={isPending}
          onConfirmar={() => darBaja(empleadoBaja.id)}
          onCancelar={() => setEmpleadoBaja(null)}
        />
      )}
    </>
  );
};
