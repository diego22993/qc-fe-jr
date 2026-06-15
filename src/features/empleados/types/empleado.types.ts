// features/empleados/types/empleado.types.ts
// ISP: interfaces pequeñas y específicas para cada uso.

export type RolEmpleado = 'Veterinario' | 'Recepcionista' | 'Administrativo' | 'Auxiliar';

export interface Empleado {
  id: string;
  // Datos básicos
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: RolEmpleado;
  // Credenciales
  usuario: string;
  contrasenia: string;
  // Datos laborales
  sueldo: number;
  horario: string;
  fechaIngreso: string;
  active: boolean;
}

// Para el formulario — sin id ni active (los genera el backend)
export type EmpleadoFormData = Omit<Empleado, 'id' | 'active'>;