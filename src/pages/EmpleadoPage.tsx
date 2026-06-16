// src/pages/EmpleadoPage.tsx
import React from "react";
import { LandingContainer } from "../components/LandingContainer";
import { useAuthStore } from "../store/auth.store";

export const EmpleadoPage: React.FC = () => {
  const empleado = useAuthStore((s) => s.empleado);
  const nombre = empleado
    ? `${empleado.nombre} ${empleado.apellido}`
    : "Usuario";

  return <LandingContainer username={nombre} />;
};
