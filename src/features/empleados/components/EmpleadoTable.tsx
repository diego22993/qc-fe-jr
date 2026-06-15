// features/empleados/components/EmpleadoTable.tsx
// SRP: única responsabilidad → renderizar el listado de empleados.

import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { useBajaEmpleado, useEmpleados } from "../hooks/useEmpleados";
import type { Empleado } from "../types/empleado.types";
import { EmpleadoEditForm } from "./EmpleadoEditForm";
import { ModalConfirmacion } from "../../../components/ModalConfirmacion";

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
    className={`text-xs px-3 py-1 rounded-full font-medium
    ${active ? "bg-success-50 text-success-600" : "bg-danger-50 text-danger-600"}`}
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

const FilaEmpleado = ({ empleado }: { empleado: Empleado }) => (
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
    <td className="px-4 py-3 text-neutral-600">
      ${empleado.sueldo.toLocaleString("es-AR")}
    </td>
    <td className="px-4 py-3">
      <EstadoBadge active={empleado.active} />
    </td>
  </tr>
);

export const EmpleadoTable = () => {
  const { empleados, isLoading, isError } = useEmpleados();
  const [empleadoEditar, setEmpleadoEditar] = useState<Empleado | null>(null);
  const [empleadoBaja, setEmpleadoBaja] = useState<Empleado | null>(null);

  const { mutate: darBaja, isPending } = useBajaEmpleado(() =>
    setEmpleadoBaja(null),
  );

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

  if (empleados.length === 0)
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-neutral-400 text-sm">
          No hay empleados registrados todavía.
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
            {empleados.length}{" "}
            {empleados.length === 1 ? "registro" : "registros"}
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
                  Sueldo
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">
                  Estado
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <FilaEmpleado
                  key={emp.id}
                  empleado={emp}
                  onEditar={setEmpleadoEditar}
                  onBaja={setEmpleadoBaja}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edición */}
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

      {/* Modal Baja */}
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
