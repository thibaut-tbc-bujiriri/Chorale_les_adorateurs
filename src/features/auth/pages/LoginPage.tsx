import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

const loginSchema = z.object({
  identifier: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe requis"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    setError(null);
    try {
      await login(values);
      const next = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/chants";
      navigate(next, { replace: true });
    } catch (submitError) {
      setError((submitError as Error).message);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Connexion</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Connectez-vous pour accéder à votre espace.</p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" {...register("identifier")} error={errors.identifier?.message} />
        <Input label="Mot de passe" type="password" {...register("password")} error={errors.password?.message} />
        <p className="-mt-1 text-right">
          <Link to="/forgot-password" className="text-xs font-medium text-brand-700 hover:underline dark:text-brand-300">
            Mot de passe oublié ?
          </Link>
        </p>

        {error ? <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">{error}</p> : null}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Se connecter
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
        Pas encore de compte ?{" "}
        <Link to="/register" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          S'inscrire
        </Link>
      </p>
    </section>
  );
}
