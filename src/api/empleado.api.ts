// empleados.api.ts
// DIP: abstracción de todas las llamadas HTTP de empleados.

import type {
  Empleado,
  EmpleadoFormData,
  EmpleadoEditData,
} from "../features/empleados/types/empleado.types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Lee el token del localStorage (misma key que auth.store.ts)
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

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
  const res = await fetch(`${BASE_URL}/empleados`, {
    headers: getAuthHeaders(),
  });
  const data = await handleResponse<{ data: Empleado[] }>(res);
  return data.data;
};

export const getEmpleadoPorId = async (id: string): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};

export const crearEmpleado = async (
  payload: EmpleadoFormData,
): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/nuevo`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};

export const editarEmpleado = async (
  id: string,
  payload: Partial<EmpleadoEditData>,
): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};

export const bajaEmpleado = async (id: string): Promise<Empleado> => {
  const res = await fetch(`${BASE_URL}/empleados/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse<{ data: Empleado }>(res);
  return data.data;
};
