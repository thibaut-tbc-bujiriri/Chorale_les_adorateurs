import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Nom complet requis"),
    email: z.string().email("Email invalide"),
    choirVoice: z.enum(["Soprano", "Alto", "Ténor", "Basse"]),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "Confirmez votre mot de passe"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      choirVoice: "Soprano",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    setError(null);
    setSuccess(null);
    try {
      await registerUser({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        choirVoice: values.choirVoice,
      });
      setSuccess("Compte créé avec succès. Vous pouvez maintenant vous connecter.");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (submitError) {
      setError((submitError as Error).message);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Créer un compte</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Inscrivez-vous pour accéder à l'application. Votre rôle initial est <strong>choriste</strong>.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nom complet" {...register("fullName")} error={errors.fullName?.message} />
        <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Voix</span>
          <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" {...register("choirVoice")}>
            <option value="Soprano">Soprano</option>
            <option value="Alto">Alto</option>
            <option value="Ténor">Ténor</option>
            <option value="Basse">Basse</option>
          </select>
        </label>

        <Input label="Mot de passe" type="password" {...register("password")} error={errors.password?.message} />
        <Input
          label="Confirmer le mot de passe"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {success ? <p className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{success}</p> : null}
        {error ? <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          S'inscrire
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
        Vous avez déjà un compte ?{" "}
        <Link to="/login" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          Se connecter
        </Link>
      </p>
    </section>
  );
}
