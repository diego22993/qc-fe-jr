import { z } from "zod";

export const empleadoSchema = z.object({
  // Datos básicos
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "Máximo 50 caracteres"),

  apellido: z
    .string()
    .min(1, "El apellido es obligatorio")
    .max(50, "Máximo 50 caracteres"),

  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Debe ser un email válido"),

  telefono: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .regex(/^\d+$/, "Solo se permiten números"),

  /*rol: z.enum(['Veterinario', 'Recepcionista', 'Administrativo', 'Auxiliar'] as const, {
    errorMap: () => ({ message: 'Seleccioná un rol válido' }),
  }),*/
  rol: z.enum(
    ["Veterinario", "Recepcionista", "Administrativo", "Auxiliar"] as const,
    {
      error: "Seleccioná un rol válido",
    },
  ),

  // Credenciales
  usuario: z
    .string()
    .min(4, "El usuario debe tener al menos 4 caracteres")
    .max(30, "Máximo 30 caracteres")
    .regex(/^\S+$/, "El usuario no puede tener espacios"),

  contrasenia: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),

  // Datos laborales
  sueldo: z
    //.number({ invalid_type_error: "El sueldo debe ser un número" })
    .number({ error: "El sueldo debe ser un número" })
    .positive("El sueldo debe ser mayor a 0"),

  horario: z.string().min(1, "El horario es obligatorio"),

  fechaIngreso: z
    .string()
    .min(1, "La fecha de ingreso es obligatoria")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Debe ser una fecha válida (YYYY-MM-DD)",
    }),
});

export type EmpleadoSchema = z.infer<typeof empleadoSchema>;
