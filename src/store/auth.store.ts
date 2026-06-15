// store/auth.store.ts
// SRP: única responsabilidad → estado global de autenticación.

import { create } from 'zustand';
import type { Empleado } from '../features/empleados/types/empleado.types';

interface AuthState {
  empleado: Omit<Empleado, 'contrasenia'> | null;
  isAuthenticated: boolean;
  setEmpleado: (empleado: Omit<Empleado, 'contrasenia'>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  empleado: null,
  isAuthenticated: false,

  setEmpleado: (empleado) => set({ empleado, isAuthenticated: true }),

  logout: () => set({ empleado: null, isAuthenticated: false }),
}));