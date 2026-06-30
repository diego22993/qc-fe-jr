import React from "react";

export const RolPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
      {/* Imagen Grande y Centrada */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/576/576997.png"
        alt="En construcción"
        className="w-48 h-48 md:w-64 md:h-64 object-contain animate-pulse"
      />

      {/* Texto Descriptivo */}
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-neutral-700 flex items-center justify-center gap-2">
          <i className="ti ti-key" /> Módulo de Roles
        </h2>
        <p className="text-neutral-400 font-medium tracking-wide uppercase text-xs md:text-sm">
          EN CONSTRUCCIÓN
        </p>
      </div>
    </div>
  );
};
