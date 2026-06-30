// src/router/AppRouter.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";
import { EmpleadoPage } from "../pages/EmpleadoPage";
import { TurnoPage } from "../pages/TurnoPage";
import { RolPage } from "../pages/RolPage";
import { ReportePage } from "../pages/ReportePage";
import { LoginPage } from "../pages/LoginPage";
import { Modal } from "../components/Modal";
import { NuevoEmpleadoForm } from "../features/empleados/components/NuevoEmpleadoForm";

const NuevoEmpleadoModalRoute = () => {
  const navigate = useNavigate();
  const cerrarModal = () => navigate("/empleados");

  return (
    <Modal titulo="Registrar Nuevo Empleado" onClose={cerrarModal}>
      <NuevoEmpleadoForm onCancelar={cerrarModal} onSuccess={cerrarModal} />
    </Modal>
  );
};

export const AppRouter = () => (
  <Routes>
    {/* Ruta Pública */}
    <Route path="/login" element={<LoginPage />} />

    {/* Capa 1: Rutas Privadas */}
    <Route element={<ProtectedRoute />}>
      {/* Capa 2: Estructura Base de la App (Sidebar, Navbar, etc.) */}
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />

        {/* Capa 3: Módulo de Empleados + Sub-ruta para el Modal */}
        <Route path="/empleados" element={<EmpleadoPage />}>
          <Route path="nuevo" element={<NuevoEmpleadoModalRoute />} />
        </Route>

        {/* 🔑 Capa 3: Módulo de Roles */}
        <Route path="/roles" element={<RolPage />}>
          {/* Si mañana querés meter un modal de creación por URL vas acá abajo: */}
          {/* <Route path="nuevo" element={<NuevoRolModalRoute />} /> */}
        </Route>

        {/* ⏰ Capa 3: Módulo de Turnos */}
        <Route path="/turnos" element={<TurnoPage />}>
          {/* Si mañana querés meter un modal de creación por URL vas acá abajo: */}
          {/* <Route path="nuevo" element={<NuevoTurnoModalRoute />} /> */}
        </Route>

        {/* 📊 Capa 3: Módulo de Reportes */}
        <Route path="/reportes" element={<ReportePage />} />
      </Route>
    </Route>

    {/* Comodín: Cualquier ruta inválida rebota al login */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
