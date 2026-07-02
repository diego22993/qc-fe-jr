// features/empleados/components/EmpleadoEditForm.tsx
// SRP: única responsabilidad → formulario de edición de empleado.
// Alcance de edición desde el FE: nombre, apellido, teléfono y email.
// El estado (active) es de uso exclusivo del backend y no se expone acá.
// Regla de negocio: un empleado dado de baja (active=false) no puede editarse.

import { useState } from "react";
import { useEditarEmpleado } from "../hooks/useEmpleados";
import type { Empleado } from "../types/empleado.types";

interface Props {
  empleado: Empleado;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const Field = ({ label, error, required, children }: FieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-text-muted">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);

const soloLecturaClass = "opacity-60 bg-gray-50 cursor-not-allowed";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormValues {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
}

interface FormErrors {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  email?: string;
}

export const EmpleadoEditForm = ({ empleado, onSuccess, onCancel }: Props) => {
  // Regla de negocio: sólo se pueden editar empleados activos.
  const puedeEditar = empleado.active;

  const [valores, setValores] = useState<FormValues>({
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    telefono: empleado.telefono,
    email: empleado.email,
  });
  const [errores, setErrores] = useState<FormErrors>({});

  const { mutate, isPending, isError, error } = useEditarEmpleado(onSuccess);

  const actualizarCampo = (campo: keyof FormValues, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }));
  };

  const validar = (): FormErrors => {
    const nuevosErrores: FormErrors = {};

    if (!valores.nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío.";
    }
    if (!valores.apellido.trim()) {
      nuevosErrores.apellido = "El apellido no puede estar vacío.";
    }
    if (!valores.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono no puede estar vacío.";
    }
    if (!EMAIL_REGEX.test(valores.email.trim())) {
      nuevosErrores.email = "El formato del correo electrónico no es válido.";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puedeEditar) return;

    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    // El backend exige al menos un campo modificado: sólo mandamos lo que cambió.
    const cambios: Partial<FormValues> = {};
    const nombreLimpio = valores.nombre.trim();
    const apellidoLimpio = valores.apellido.trim();
    const telefonoLimpio = valores.telefono.trim();
    const emailLimpio = valores.email.trim();

    if (nombreLimpio !== empleado.nombre) cambios.nombre = nombreLimpio;
    if (apellidoLimpio !== empleado.apellido) cambios.apellido = apellidoLimpio;
    if (telefonoLimpio !== empleado.telefono) cambios.telefono = telefonoLimpio;
    if (emailLimpio !== empleado.email) cambios.email = emailLimpio;

    if (Object.keys(cambios).length === 0) {
      onCancel();
      return;
    }

    mutate({ id: empleado.id, data: cambios });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!puedeEditar && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          Este empleado está dado de baja. No se pueden editar sus datos.
        </p>
      )}

      {/* ── Campos editables ── */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nombre" error={errores.nombre} required>
          <input
            value={valores.nombre}
            disabled={!puedeEditar}
            onChange={(e) => actualizarCampo("nombre", e.target.value)}
            className={!puedeEditar ? soloLecturaClass : ""}
          />
        </Field>
        <Field label="Apellido" error={errores.apellido} required>
          <input
            value={valores.apellido}
            disabled={!puedeEditar}
            onChange={(e) => actualizarCampo("apellido", e.target.value)}
            className={!puedeEditar ? soloLecturaClass : ""}
          />
        </Field>
        <Field label="Email" error={errores.email} required>
          <input
            type="email"
            value={valores.email}
            disabled={!puedeEditar}
            onChange={(e) => actualizarCampo("email", e.target.value)}
            className={!puedeEditar ? soloLecturaClass : ""}
          />
        </Field>
        <Field label="Teléfono" error={errores.telefono} required>
          <input
            value={valores.telefono}
            disabled={!puedeEditar}
            onChange={(e) => actualizarCampo("telefono", e.target.value)}
            className={!puedeEditar ? soloLecturaClass : ""}
          />
        </Field>
      </div>

      {/* ── Datos fuera del alcance de edición — sólo lectura ── */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Rol">
          <input value={empleado.rol} disabled className={soloLecturaClass} />
        </Field>
        <Field label="Usuario">
          <input
            value={empleado.usuario}
            disabled
            className={soloLecturaClass}
          />
        </Field>
        <Field label="Contraseña">
          <input
            type="password"
            value={empleado.contrasenia}
            disabled
            className={soloLecturaClass}
          />
        </Field>
        <Field label="Fecha de ingreso">
          <input
            value={empleado.fechaIngreso.split("T")[0]}
            disabled
            className={soloLecturaClass}
          />
        </Field>
      </div>

      {isError && (
        <p className="text-xs text-red-500">{(error as Error).message}</p>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 text-sm font-medium rounded-md border border-border-primary text-text-muted hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending || !puedeEditar}
          title={!puedeEditar ? "El empleado está dado de baja" : undefined}
          className="px-5 py-2 text-sm font-medium rounded-md bg-brand-green text-brand-green-text hover:bg-brand-green-hover transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};
