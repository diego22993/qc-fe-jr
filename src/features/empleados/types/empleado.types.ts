// features/empleados/types/empleado.types.ts
// ISP: interfaces pequeñas y específicas para cada uso.

export type RolEmpleado = 'Recepcionista' | 'Admin' | 'QC' | 'Desarrollador';

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
  horario: string;
  fechaIngreso: string;
  active: boolean;
}

// Para el formulario — sin id ni active (los genera el backend)
export type EmpleadoFormData = Omit<Empleado, 'id' | 'active'>;