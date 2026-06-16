// types/auth.types.ts
import type { Empleado } from "../features/empleados/types/empleado.types";

// Re-exporta para que el resto del módulo auth lo use desde acá
export type { Empleado };

export interface LoginResponseData {
  empleado: Omit<Empleado, "contrasenia">;
  token: string;
}
