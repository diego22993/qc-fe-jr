// src/components/SelectField.tsx
// SRP: única responsabilidad → renderizar un campo de selección nativo y estilizado, sin iconos.

import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[];
  error?: string; // Capa personalizada de errores inline
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col w-full text-left">
      <label className="text-[14px] font-bold text-[#2d3748] mb-1.5 tracking-wide" htmlFor={id}>
        {label}
      </label>
      
      <div className="relative flex items-center w-full">
        <select
          id={id}
          className={`w-full bg-[#fdfdfd] text-[#111827] rounded-lg py-3 pl-4 pr-11 text-sm font-medium outline-none transition-all shadow-xs appearance-none border ${
            error 
              ? "border-danger-500 focus:border-danger-600" 
              : "border-[#99f6e4] focus:border-[#0d9488]"
          } ${className}`}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Flecha indicadora a la derecha de Tabler Icons */}
        <span className="absolute right-4 text-[#0f766e]/70 text-sm pointer-events-none select-none">
          <i className="ti ti-chevron-down" />
        </span>
      </div>

      {error && (
        <span className="text-danger-600 text-xs font-medium mt-1">
          {error}
        </span>
      )}
    </div>
  );
};