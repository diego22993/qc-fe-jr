  // api/auth.api.ts
  // DIP: abstracción de las llamadas HTTP de autenticación.

  import type { Empleado } from '../features/empleados/types/empleado.types';

  const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

  export interface LoginPayload {
    usuario: string;
    contrasenia: string;
  }

  export interface LoginResponse {
    mensaje: string;
    data: Omit<Empleado, 'contrasenia'>;
  }

  const handleResponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(error.error ?? `Error ${res.status}`);
    }
    return res.json();
  };

  export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<LoginResponse>(res);
  };