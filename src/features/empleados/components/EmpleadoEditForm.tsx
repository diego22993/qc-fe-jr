// features/empleados/components/EmpleadoEditForm.tsx
// SRP: única responsabilidad → formulario de edición de empleado.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  empleadoSchema,
  type EmpleadoSchema,
} from "../schemas/empleado.schema";
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
    <label className="text-xs text-neutral-600">
      {label} {required && <span className="text-danger-600">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-danger-600">{error}</p>}
  </div>
);

export const EmpleadoEditForm = ({ empleado, onSuccess, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpleadoSchema>({
    resolver: zodResolver(empleadoSchema),
    defaultValues: {
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      telefono: empleado.telefono,
      rol: empleado.rol,
      usuario: empleado.usuario,
      contrasenia: empleado.contrasenia,
      horario: empleado.horario,
      fechaIngreso: empleado.fechaIngreso.split("T")[0],
    },
  });

  const { mutate, isPending, isError, error } = useEditarEmpleado(onSuccess);

  const onSubmit = (data: EmpleadoSchema) => mutate({ id: empleado.id, data });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Datos personales */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nombre" error={errors.nombre?.message} required>
          <input {...register("nombre")} />
        </Field>
        <Field label="Apellido" error={errors.apellido?.message} required>
          <input {...register("apellido")} />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input type="email" {...register("email")} />
        </Field>
        <Field label="Teléfono" error={errors.telefono?.message} required>
          <input {...register("telefono")} />
        </Field>
      </div>

      <Field label="Rol" error={errors.rol?.message} required>
        <select {...register("rol")}>
          <option value="Veterinario">Veterinario</option>
          <option value="Recepcionista">Recepcionista</option>
          <option value="Administrativo">Administrativo</option>
          <option value="Auxiliar">Auxiliar</option>
        </select>
      </Field>

      {/* Credenciales */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Usuario" error={errors.usuario?.message} required>
          <input {...register("usuario")} />
        </Field>
        <Field label="Contraseña" error={errors.contrasenia?.message} required>
          <input type="password" {...register("contrasenia")} />
        </Field>
      </div>

      {/* Datos laborales */}
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Fecha de ingreso"
          error={errors.fechaIngreso?.message}
          required
        >
          <input type="date" {...register("fechaIngreso")} />
        </Field>
      </div>

      <Field label="Horario" error={errors.horario?.message} required>
        <input {...register("horario")} />
      </Field>

      {isError && (
        <p className="text-xs text-danger-600">{(error as Error).message}</p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded border border-neutral-100 text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm rounded bg-primary-600 text-white hover:bg-primary-800 transition-colors disabled:opacity-60"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};
