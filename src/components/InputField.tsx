import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  children?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  children,
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
        {/* Usamos clases condicionales de Tailwind para cambiar el fondo a gris si está deshabilitado */}
        <input
          id={id}
          className="w-full bg-[#fdfdfd] border border-[#99f6e4] text-[#111827] placeholder-[#0f766e]/70 rounded-lg py-3 pl-11 pr-11 text-sm font-medium outline-none transition-all focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] disabled:bg-[#f3f4f6] disabled:border-gray-200 disabled:text-gray-400 disabled:placeholder-gray-300 disabled:cursor-not-allowed shadow-xs"
          {...rest}
        />

        {children}
      </div>
    </div>
  );
};
