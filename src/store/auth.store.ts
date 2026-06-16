// store/auth.store.ts
// SRP: única responsabilidad → estado global de autenticación.

import { create } from "zustand";
import type { Empleado } from "../features/empleados/types/empleado.types";

const TOKEN_KEY = "auth_token";
const EMPLEADO_KEY = "auth_empleado";

interface AuthState {
  empleado: Omit<Empleado, "contrasenia"> | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (empleado: Omit<Empleado, "contrasenia">, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Rehidratación desde localStorage al iniciar la app
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  empleado: (() => {
    try {
      const raw = localStorage.getItem(EMPLEADO_KEY);
      return raw ? (JSON.parse(raw) as Omit<Empleado, "contrasenia">) : null;
    } catch {
      return null;
    }
  })(),

  setAuth: (empleado, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EMPLEADO_KEY, JSON.stringify(empleado));
    set({ empleado, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMPLEADO_KEY);
    set({ empleado: null, token: null, isAuthenticated: false });
  },
}));
