// components/LandingContainer.tsx
// SRP: componente visual de bienvenida. Recibe datos como props (no los busca).

import React from "react";

interface LandingContainerProps {
  username: string;
}

export const LandingContainer: React.FC<LandingContainerProps> = ({
  username,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f0fdfa] p-6 flex items-center justify-center select-none font-sans">
      <div className="w-full max-w-5xl bg-white border border-[#ccfbf1] rounded-2xl p-12 min-h-[500px] shadow-xl shadow-teal-950/5 flex flex-col items-center justify-center text-center transition-all">
        {/* Ícono decorativo */}
        <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-[#14b8a6] text-3xl mb-4 animate-pulse">
          🌊
        </div>

        <h2 className="text-2xl font-bold text-[#0f766e] tracking-wide">
          ¡Bienvenido, {username}!
        </h2>

        <p className="text-[#115e59]/70 text-sm mt-2 max-w-md font-medium">
          Autenticación exitosa. Seleccioná una opción del menú lateral para
          comenzar a trabajar.
        </p>

        <div className="mt-8">
          <button
            type="button"
            className="bg-white hover:bg-teal-50 text-[#0369a1] font-bold py-2.5 px-6 rounded-lg text-sm border border-[#ccfbf1] transition-all cursor-pointer shadow-xs"
            onClick={() => alert(`¡Lienzo listo, ${username}!`)}
          >
            Comenzar a construir ↗
          </button>
        </div>
      </div>
    </div>
  );
};
