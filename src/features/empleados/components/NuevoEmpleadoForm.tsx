// src/features/empleados/components/NuevoEmpleadoForm.tsx
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { SelectField } from "../components/SelectedField";
import { useCrearEmpleado } from "../hooks/useEmpleados";
import type { EmpleadoFormData } from "../types/empleado.types";

interface NuevoEmpleadoFormProps {
  onCancelar: () => void;
  onSuccess: () => void;
}

const OPCIONES_ROL = [
  { value: "Admin", label: "Administrador" },
  { value: "QC", label: "Control de Calidad (QC)" },
  { value: "Recepcionista", label: "Recepcionista" },
  { value: "Desarrollador", label: "Desarrollador" },
  { value: "Soporte", label: "Soporte Técnico" },
];

export const NuevoEmpleadoForm: React.FC<NuevoEmpleadoFormProps> = ({
  onCancelar,
  onSuccess,
}) => {
  // Vinculamos la mutación de TanStack Query
  const {
    mutate,
    isPending,
    error: mutationError,
  } = useCrearEmpleado(onSuccess);

  // 1. Estado local para alternar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // 2. Estado para almacenar los mensajes de error inline personalizados
  const [errores, setErrores] = useState<Record<string, string>>({});

  // 3. Estado del formulario (Nota: 'rol' se inicializa con "Admin" para cumplir con el tipo RolEmpleado)
  const [formData, setFormData] = useState<EmpleadoFormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "Admin",
    usuario: "",
    contrasenia: "",
    fechaIngreso: "",
    horario: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // UX: Limpia el error inline del campo en tiempo real mientras el usuario escribe
    if (errores[name]) {
      setErrores((prev) => {
        const nuevos = { ...prev };
        delete nuevos[name];
        return nuevos;
      });
    }
  };

  // 4. Motor de validación personalizado (Reglas de Negocio en Frontend)
  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim())
      nuevosErrores.apellido = "El apellido es obligatorio.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = "El formato de correo electrónico no es válido.";
    }

    const telRegex = /^[0-9+\s-]+$/;
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!telRegex.test(formData.telefono)) {
      nuevosErrores.telefono = "Solo se permiten números, espacios, '+' o '-'.";
    }

    if (!formData.usuario.trim())
      nuevosErrores.usuario = "El usuario de sistema es obligatorio.";
    if (!formData.contrasenia)
      nuevosErrores.contrasenia = "La contraseña es obligatoria.";
    else if (formData.contrasenia.length < 8) {
      nuevosErrores.contrasenia =
        "La contraseña debe contener al menos 8 caracteres.";
    }
    if (!formData.rol)
      nuevosErrores.rol = "Debe seleccionar un rol para el empleado.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; // Retorna true si el formulario es válido
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Si las validaciones manuales fallan, detenemos el envío
    if (!validarFormulario()) return;

    mutate(formData);
  };

  return (
    // 🟢 noValidate desactiva por completo los globos flotantes nativos del navegador ("Completa este campo")
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 text-left"
    >
      {/* Mensaje de error general de la API */}
      {mutationError && (
        <div className="p-3 bg-danger-50 border border-danger-200 text-danger-600 rounded-lg text-xs font-medium">
          {mutationError.message ||
            "Ocurrió un error al registrar al empleado."}
        </div>
      )}

      {/* Fila 1: Nombre y Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="nombre"
          name="nombre"
          label="Nombre"
          placeholder="Ingrese valor"
          value={formData.nombre}
          onChange={handleChange}
          error={errores.nombre}
        />
        <InputField
          id="apellido"
          name="apellido"
          label="Apellido"
          placeholder="Ingrese valor"
          value={formData.apellido}
          onChange={handleChange}
          error={errores.apellido}
        />
      </div>

      {/* Fila 2: Correo Electrónico y Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="email"
          name="email"
          type="email"
          label="Correo Electrónico"
          placeholder="ejemplo@empresa.com"
          value={formData.email}
          onChange={handleChange}
          error={errores.email}
        />
        <InputField
          id="telefono"
          name="telefono"
          type="tel"
          label="Teléfono"
          placeholder="Ingrese valor"
          value={formData.telefono}
          onChange={handleChange}
          error={errores.telefono}
        />
      </div>

      {/* Fila 3: Usuario y Rol Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="usuario"
          name="usuario"
          label="Usuario de Sistema"
          placeholder="Ingrese valor"
          value={formData.usuario}
          onChange={handleChange}
          error={errores.usuario}
        />
        <SelectField
          id="rol"
          name="rol"
          label="Rol / Puesto"
          options={OPCIONES_ROL}
          value={formData.rol}
          onChange={handleChange}
          error={errores.rol}
        />
      </div>

      {/* Fila 4: Fecha de Ingreso y Horario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="fechaIngreso"
          name="fechaIngreso"
          type="date"
          label="Fecha de Ingreso"
          value={formData.fechaIngreso}
          onChange={handleChange}
          error={errores.fechaIngreso}
        />
        {/* Fila 5: Contraseña de Acceso (Muestra directamente el texto al pulsar el ojo) */}
        <div className="w-full">
          <InputField
            id="contrasenia"
            name="contrasenia"
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            placeholder="••••••••"
            value={formData.contrasenia}
            onChange={handleChange}
            error={errores.contrasenia}
          >
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 text-neutral-400 hover:text-[#0d9488] transition-colors focus:outline-none select-none z-10 cursor-pointer flex items-center h-full"
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <i
                className={`ti ${showPassword ? "ti-eye" : "ti-eye-off"} text-base`}
              />
            </button>
          </InputField>
        </div>
      </div>

      {/* Botonera de Acciones */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100 mt-4">
        <button
          type="button"
          onClick={onCancelar}
          disabled={isPending}
          className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm font-medium text-white bg-[#0d9488] rounded-lg hover:bg-[#0f766e] transition-colors disabled:opacity-50"
        >
          {isPending ? "Guardando..." : "Aceptar"}
        </button>
      </div>
    </form>
  );
};
