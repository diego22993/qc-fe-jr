// src/components/LandingContainer.tsx
import React from "react";

export const LandingContainer: React.FC = () => {
  return (
    // Contenedor principal: Ocupa todo el espacio disponible dentro del MainLayout
    <div className="min-h-[calc(100vh-4rem)] bg-[#f0fdfa] p-6 flex items-center justify-center select-none font-sans">
      {/* Tarjeta contenedora en blanco para el contenido futuro */}
      <div className="w-full max-w-5xl bg-white border border-[#ccfbf1] rounded-2xl p-12 min-h-[500px] shadow-xl shadow-teal-950/5 flex flex-col items-center justify-center text-center transition-all">
        {/* Gráfico / Icono decorativo acuoso sutil en el centro */}
        <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-[#14b8a6] text-3xl mb-4 animate-pulse">
          🌊
        </div>

        {/* Textos guía (Lienzo de desarrollo) */}
        <h2 className="text-2xl font-bold text-[#0f766e] tracking-wide">
          Landing Page
        </h2>

        <p className="text-[#115e59]/70 text-sm mt-2 max-w-md font-medium">
          ¡Autenticación exitosa! Este espacio está listo y en blanco para que
          modeles el panel de administración, gráficos o la gestión de
          empleados.
        </p>

        {/* Botón de acción rápido temporal por si quieres testear interacciones */}
        <div className="mt-8">
          <button
            type="button"
            className="bg-white hover:bg-teal-50 text-[#0369a1] font-bold py-2.5 px-6 rounded-lg text-sm border border-[#ccfbf1] transition-all cursor-pointer shadow-xs"
            onClick={() => alert("¡Lienzo listo, Diego!")}
          >
            Comenzar a construir ↗
          </button>
        </div>
      </div>
    </div>
  );
};
