// src/router/AppRouter.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import { LandingPage } from "../pages/LandingPage";
import { EmpleadoPage } from "../pages/EmpleadoPage";
import { LoginPage } from "../pages/LoginPage";
import { Modal } from "../components/Modal";
import { NuevoEmpleadoForm } from "../features/empleados/components/NuevoEmpleadoForm";

const NuevoEmpleadoModalRoute = () => {
  const navigate = useNavigate();
  const cerrarModal = () => navigate("/empleados");

  return (
    <Modal titulo="Registrar Nuevo Empleado" onClose={cerrarModal}>
      <NuevoEmpleadoForm
        onCancelar={cerrarModal}
        onSuccess={cerrarModal} // Al tener éxito, cierra el modal; React Query refresca el fondo solo.
      />
    </Modal>
  );
};

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />

        {/* Rutas Anidadas (Nested Routes) */}
        <Route path="/empleados" element={<EmpleadoPage />}>
          <Route path="nuevo" element={<NuevoEmpleadoModalRoute />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
