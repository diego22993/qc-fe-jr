import React, { useState } from "react";
import { authService } from "../services/auth.service";
import { InputField } from "./InputField";

export const LoginCard: React.FC = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [contrasenia, setContrasenia] = useState<string>("");
  const [mostrarPassword, setMostrarPassword] = useState<boolean>(false);
  const [errorBE, setErrorBE] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // === MÁQUINA DE ESTADOS CALCULADA (Derived State) ===
  const longitudUsuario = usuario.trim().length;
  const longitudContrasenia = contrasenia.length;

  const tieneUsuario = longitudUsuario >= 6;
  const habilitaOjo = longitudContrasenia >= 1;
  const contraseniaValida = longitudContrasenia >= 8;

  const esFormularioValido = tieneUsuario && contraseniaValida;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!esFormularioValido) return;

    setIsLoading(true);
    setErrorBE(null);

    try {
      const { empleado, token } = await authService.login(
        usuario.trim(),
        contrasenia,
      );
      localStorage.setItem("token", token);
      localStorage.setItem("empleado", JSON.stringify(empleado));
      window.location.href = "/dashboard";
    } catch (error) {
      setErrorBE(
        error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0fdfa] font-sans p-4 select-none">
      <header className="text-center mb-8">
        <h1 className="text-[26px] font-bold tracking-wide text-[#0f766e] flex items-center justify-center gap-2">
          <span className="text-[#14b8a6] font-light">SISTEMA</span> RRHH
        </h1>
        <p className="text-[#115e59] text-sm mt-1.5 font-medium">
          Ingresá con tus credenciales
        </p>
      </header>

      <div className="bg-white border border-[#ccfbf1] rounded-xl p-8 w-full max-w-[420px] shadow-xl">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col space-y-5"
        >
          {/* REGLA 1: Usuario habilitado por defecto */}
          <InputField
            id="usuario"
            label="Usuario"
            icon="👤"
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            disabled={isLoading}
            required
          />

          {/* REGLA 2: Contraseña inhabilitada hasta que se ingrese al menos 1 carácter en usuario */}
          <InputField
            id="contrasenia"
            label="Contraseña"
            icon="🔒"
            type={mostrarPassword ? "text" : "password"}
            placeholder={"Ingrese su contraseña"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            disabled={!tieneUsuario || isLoading}
            required
          >
            {/* REGLA 3: Botón del ojo se habilita al tipear el 1er carácter */}
            <button
              type="button"
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0f766e] transition-all z-20 w-8 h-8 rounded-full !border-none !bg-none
                ${
                  !habilitaOjo
                    ? "opacity-0 scale-75 cursor-not-allowed pointer-events-none"
                    : "opacity-100 scale-100 hover:bg-teal-50 hover:text-[#0d9488] cursor-pointer"
                }`}
              onClick={() => setMostrarPassword(!mostrarPassword)}
              tabIndex={-1}
              disabled={!habilitaOjo}
            >
              <span className="text-base leading-none">
                {mostrarPassword ? "👁️‍🗨️" : "👁️"}
              </span>
            </button>
          </InputField>

          {errorBE && (
            <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-lg text-[14px] font-semibold text-left">
              <span className="text-base flex-shrink-0">🚫</span>
              <span>{errorBE}</span>
            </div>
          )}

          {/* REGLA 4: El botón se activa únicamente al pasar el 3er carácter de la contraseña */}
          <button
            type="submit"
            className="w-full text-white font-bold py-3.5 px-4 rounded-lg tracking-wide transition-all text-[15px] flex justify-center items-center gap-2 shadow-md border
              disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 disabled:opacity-100 disabled:cursor-not-allowed disabled:shadow-none
              enabled:bg-[#0369a1] enabled:hover:bg-[#025a8b] enabled:border-[#025a8b] enabled:cursor-pointer"
            disabled={!esFormularioValido || isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>

      {/* Tu firma profesional con el link a tu perfil */}
      <footer className="mt-10 text-[12px] text-[#115e59]/60 tracking-wide font-medium text-center flex flex-col gap-1.5">
        <p>
          © 2026 Sistema de Gestión Interno · RRHH. Todos los derechos
          reservados.
        </p>
        <p className="text-[#14b8a6]/80 text-[11px] font-mono tracking-normal flex items-center justify-center gap-1.5">
          <span>Desarrollado por</span>
          <a
            href="https://www.linkedin.com/in/tu-usuario-aqui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#0369a1] hover:text-[#025a8b] hover:underline flex items-center gap-0.5 transition-all cursor-pointer"
            title="Ver perfil de LinkedIn de Diego"
          >
            <i className="ti ti-brand-linkedin text-sm" />
            Diego N. Heredia Ligorria
          </a>
        </p>
      </footer>
    </div>
  );
};
