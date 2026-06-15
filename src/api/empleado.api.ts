// api/empleados.api.ts
// DIP: abstracción de todas las llamadas HTTP de empleados.

import type { Empleado, EmpleadoFormData } from "../features/empleados/types/empleado.types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(error.error ?? `Error ${res.status}`);
  }
  return res.json();
};

export const getEmpleados = async (): Promise<Empleado[]> => {
  const res = await fetch(`${BASE_URL}/empleados`);
  const data = await handleResponse<{ data: Empleado[] }>(res);
  return data.data;
};

export const getEmpleadoPorId = async (id: string): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/${id}`);
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};

export const crearEmpleado = async (
  payload: EmpleadoFormData,
): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};

export const editarEmpleado = async (
  id: string,
  payload: Partial<EmpleadoFormData>,
): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};

export const bajaEmpleado = async (id: string): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/${id}`, {
    method: "DELETE",
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};
