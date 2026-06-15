// SRP: única responsabilidad → definición central de rutas.
// OCP: agregar una ruta nueva no modifica las existentes.

import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/----MainLayout2";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
//import { EmpleadosPage } from "../pages/EmpleadoPage";
import { EmpleadoDetallePage } from "../pages/EmpleadoDetallePage";

export const AppRouter = () => (
  <Routes>
    {/* Ruta pública */}
    <Route path="/login" element={<LoginPage />} />

    {/* Rutas protegidas */}
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/empleados" replace />} />
        {/* <Route path="/empleados" element={<EmpleadosPage />} /> */}
        <Route path="/empleados/:id" element={<EmpleadoDetallePage />} />
      </Route>
    </Route>

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
