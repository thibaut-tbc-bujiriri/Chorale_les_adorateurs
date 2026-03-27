import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

const forgotSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotSchema = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotSchema>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotSchema) => {
    setError(null);
    setSuccess(null);

    try {
      await requestPasswordReset(email);
      setSuccess("Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.");
    } catch (submitError) {
      setError((submitError as Error).message);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Mot de passe oublié</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Entrez votre email pour recevoir un lien de réinitialisation.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />

        {error ? <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">{error}</p> : null}
        {success ? <p className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">{success}</p> : null}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Envoyer le lien
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
