// features/auth/hooks/useLogin.ts
// SRP: orquesta login → store → navegación.
// Creator (GRASP): crea la mutación y conecta las piezas.

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth.service";
import { useAuthStore } from "../../../store/auth.store";

interface LoginCredentials {
  usuario: string;
  contrasenia: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ usuario, contrasenia }: LoginCredentials) =>
      authService.login(usuario, contrasenia),

    onSuccess: (data) => {
      // data = LoginResponseData = { empleado, token }
      setAuth(data.empleado, data.token); // persiste en Zustand + localStorage
      navigate("/", { replace: true }); // redirige a LandingPage
    },

    onError: (err: Error) => {
      console.error("[Login error]", err.message);
    },
  });

  return {
    login: mutate,
    isPending,
    errorMessage: error?.message ?? null,
  };
};
