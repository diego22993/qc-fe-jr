// SRP: única responsabilidad → formulario de autenticación.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginSchema } from '../schemas/login.schema';
import { loginApi } from '../../../api/auth.api';
import { useAuthStore } from '../../../store/auth.store';

export const LoginForm = () => {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorServidor, setErrorServidor]     = useState<string | null>(null);
  const [isPending, setIsPending]             = useState(false);

  const navigate      = useNavigate();
  const setEmpleado   = useAuthStore((s) => s.setEmpleado);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setErrorServidor(null);
    setIsPending(true);
    try {
      const res = await loginApi(data);
      setEmpleado(res.data);
      navigate('/empleados');
    } catch (error) {
      setErrorServidor((error as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* Logo */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
            <i className="ti ti-paw text-2xl text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-base font-medium text-neutral-800">Sistema RRHH</p>
            <p className="text-xs text-neutral-400">Ingresá con tus credenciales</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-neutral-100 rounded-lg p-6 flex flex-col gap-4">

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Usuario */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-600">Usuario</label>
              <div className="relative">
                <i className="ti ti-user absolute left-3 top-1/2 -translate-y-1/2 text-base text-neutral-400 pointer-events-none" aria-hidden="true" />
                <input
                  {...register('usuario')}
                  type="text"
                  placeholder="Ingrese su usuario"
                  className="pl-9"
                  autoComplete="username"
                />
              </div>
              {errors.usuario && (
                <p className="text-xs text-danger-600">{errors.usuario.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-600">Contraseña</label>
              <div className="relative">
                <i className="ti ti-lock absolute left-3 top-1/2 -translate-y-1/2 text-base text-neutral-400 pointer-events-none" aria-hidden="true" />
                <input
                  {...register('contrasenia')}
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  className="pl-9 pr-9"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <i className={`ti ${mostrarPassword ? 'ti-eye-off' : 'ti-eye'} text-base`} aria-hidden="true" />
                </button>
              </div>
              {errors.contrasenia && (
                <p className="text-xs text-danger-600">{errors.contrasenia.message}</p>
              )}
            </div>

            {/* Error servidor */}
            {errorServidor && (
              <div className="bg-danger-50 border border-danger-200 rounded px-3 py-2 flex items-center gap-2">
                <i className="ti ti-alert-circle text-base text-danger-600 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs text-danger-600">{errorServidor}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 text-sm font-medium rounded bg-primary-600 text-white hover:bg-primary-800 transition-colors disabled:opacity-60 mt-1"
            >
              {isPending ? 'Verificando...' : 'Iniciar sesión'}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400">
          Sistema de gestión interno · RRHH 2026
        </p>

      </div>
    </div>
  );
};