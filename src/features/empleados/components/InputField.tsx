// src/components/InputField.tsx
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string; // Capa personalizada de errores inline
  children?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  error,
  children,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col w-full text-left">
      <label
        className="text-[14px] font-bold text-[#2d3748] mb-1.5 tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="relative flex items-center w-full">
        <input
          id={id}
          className={`w-full bg-[#fdfdfd] border text-[#111827] placeholder-[#0f766e]/40 rounded-lg py-3 pl-4 pr-11 text-sm font-medium outline-none transition-all shadow-xs ${
            error
              ? "border-red-500 ring-4 ring-red-500/10 focus:border-red-600 focus:ring-4 focus:ring-red-600/10" // 🟢 RECUADRO ROJO SUAVE (Glow/Sombra como el dibujo)
              : "border-[#99f6e4] focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
          } ${className}`}
          {...rest}
        />
        {children}
      </div>

      {/* 🟢 TEXTO DE ERROR CON ICONO DE ADVERTENCIA INTEGRADO */}
      {error && (
        <span className="text-red-600 text-xs font-medium mt-1.5 flex items-center gap-1 animate-fade-in">
          <i className="ti ti-alert-circle text-sm" />{" "}
          {/* Icono limpio sin meter tags en el string */}
          {error}
        </span>
      )}
    </div>
  );
};
