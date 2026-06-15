export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: string;
  fechaIngreso: string;
  usuario: string;
  active: boolean;
}

export interface LoginResponseData {
  empleado: Empleado;
  token: string;
}
