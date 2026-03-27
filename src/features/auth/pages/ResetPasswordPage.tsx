import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

const resetSchema = z
  .object({
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "Confirmez le mot de passe"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ResetSchema = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ password }: ResetSchema) => {
    setError(null);
    setSuccess(null);

    try {
      await resetPassword(password);
      setSuccess("Mot de passe mis à jour avec succès. Redirection vers la connexion...");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (submitError) {
      setError((submitError as Error).message);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Nouveau mot de passe</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Choisissez un nouveau mot de passe pour terminer la réinitialisation.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nouveau mot de passe" type="password" {...register("password")} error={errors.password?.message} />
        <Input label="Confirmer le mot de passe" type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />

        {error ? <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">{error}</p> : null}
        {success ? <p className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">{success}</p> : null}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Mettre à jour le mot de passe
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
        <Link to="/login" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Retour à la connexion
        </Link>
      </p>
    </section>
  );
}
