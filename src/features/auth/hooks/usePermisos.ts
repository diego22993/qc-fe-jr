// features/auth/hooks/usePermisos.ts
// SRP: única responsabilidad → derivar permisos desde el rol del empleado logueado.
// Centralizar acá evita que la lógica de roles se disperse por los componentes.

import { useAuthStore } from "../../../store/auth.store";

export const usePermisos = () => {
  const rol = useAuthStore((s) => s.empleado?.rol);

  const esAdmin = rol === "Admin";

  return {
    esAdmin,
    puedeEditar: esAdmin,
    puedeBorrar: esAdmin,
  };
};
