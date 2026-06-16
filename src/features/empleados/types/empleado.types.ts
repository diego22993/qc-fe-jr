// features/empleados/types/empleado.types.ts
// ISP: interfaces pequeñas y específicas para cada uso.

export type RolEmpleado =
  | 'Admin'
  | 'QC'
  | 'Recepcionista'
  | 'Desarrollador'
  | 'Soporte';

export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: RolEmpleado;
  usuario: string;
  contrasenia: string;
  sueldo?: number;
  horario?: string;
  fechaIngreso: string;
  active: boolean;
}

// Para el formulario — sin id ni active (los genera el backend)
export type EmpleadoFormData = Omit<Empleado, 'id' | 'active'>;