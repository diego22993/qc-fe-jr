// features/auth/schemas/login.schema.ts

import { z } from 'zod';

export const loginSchema = z.object({
  usuario: z.string().min(1, 'El usuario es obligatorio'),
  contrasenia: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginSchema = z.infer<typeof loginSchema>;