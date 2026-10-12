"use client";

import { Input } from "../atomos/input";
import { Button } from "../atomos/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/loginSchema";
import { z } from "zod";
import { login } from "../../services/authService";
import { useRouter } from "next/navigation";

type LoginFormData = z.input<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.senha);
      reset();
      router.push("/gerenciamento");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form
      data-cy="login-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-around rounded-sm gap-6 p-16 bg-backgroundClaro"
    >
      <div className="flex flex-col">
        <Input
          data-cy="login-email"
          placeholder="Digite seu email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span data-cy="login-email-erro" className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <Input
          data-cy="login-senha"
          placeholder="Digite sua senha"
          type="password"
          {...register("senha")}
        />
        {errors.senha && (
          <span data-cy="login-senha-erro" className="text-red-500 text-sm">{errors.senha.message}</span>
        )}
      </div>

      <Button data-cy="login-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <Link href="/cadastro/funcionario">
        <Button data-cy="login-cadastrar" type="button">Cadastrar-se</Button>
      </Link>
    </form>
  );
};