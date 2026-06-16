// components/LoginCard.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../features/auth/hooks/useLogin";

const loginSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido"),
  contrasenia: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginCard = () => {
  const { login, isPending, errorMessage } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data); // dispara mutación → onSuccess → navigate('/')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("usuario")} placeholder="Usuario" />
      {errors.usuario && <span>{errors.usuario.message}</span>}

      <input
        {...register("contrasenia")}
        type="password"
        placeholder="Contraseña"
      />
      {errors.contrasenia && <span>{errors.contrasenia.message}</span>}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};
