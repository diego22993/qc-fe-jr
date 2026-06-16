// pages/LandingPage.tsx
// SRP: página de bienvenida post-login.
// Lee el empleado del store (fuente de verdad), no de una API falsa.

import React from "react";
import { useAuthStore } from "../store/auth.store";
import { LandingContainer } from "../components/LandingContainer";

export const LandingPage: React.FC = () => {
  const empleado = useAuthStore((s) => s.empleado);
  const nombre = empleado
    ? `${empleado.nombre} ${empleado.apellido}`
    : "Usuario";

  //return `It works! ${nombre}`; 
  return <LandingContainer username={nombre} />;
};
