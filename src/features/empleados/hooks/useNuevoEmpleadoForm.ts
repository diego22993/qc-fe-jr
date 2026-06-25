/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/empleados/hooks/useNuevoEmpleadoForm.ts
import { useState } from "react";
import type { EmpleadoFormData } from "../types/empleado.types";
import { crearEmpleado } from "../../../api/empleado.api";

interface UseNuevoEmpleadoFormProps {
  onSuccess: () => void;
}

export const useNuevoEmpleadoForm = ({
  onSuccess,
}: UseNuevoEmpleadoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EmpleadoFormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "Soporte",
    usuario: "",
    contrasenia: "",
    fechaIngreso: "",
    horario: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await crearEmpleado(formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al registrar al empleado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  };
};
