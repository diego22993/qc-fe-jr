// router/AppRouter.tsx
// SRP: única responsabilidad → definición central de rutas.
// OCP: agregar una ruta nueva no modifica las existentes.

import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { EmpleadoDetallePage } from "../pages/EmpleadoDetallePage";
import { MainLayout } from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";
import { EmpleadoPage } from "../pages/EmpleadoPage";

export const AppRouter = () => (
  <Routes>
    {/* Ruta pública */}
    <Route path="/login" element={<LoginPage />} />

    {/* Rutas protegidas — todas dentro de MainLayout (sidebar) */}
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} /> {/* / */}
        <Route path="/empleados" element={<EmpleadoPage />} />{" "}
        {/* /empleados */}
        <Route path="/empleados/:id" element={<EmpleadoDetallePage />} />{" "}
        {/* /empleados/:id */}
      </Route>
    </Route>

    {/* Catch-all → login */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
