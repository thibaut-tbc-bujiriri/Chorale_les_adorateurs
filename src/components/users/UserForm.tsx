import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { userSchema, type UserSchema } from "@/features/users/validation/user.schema";

interface UserFormProps {
  mode: "create" | "edit";
  defaultValues?: UserSchema;
  onSubmit: (values: UserSchema) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function UserForm({ mode, defaultValues, onSubmit, isSubmitting }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues ?? {
      fullName: "",
      email: "",
      role: "choriste",
      choirVoice: "Soprano",
      phone: "",
      password: "",
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nom complet" {...register("fullName")} error={errors.fullName?.message} />
      <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />

      {mode === "create" ? (
        <div>
          <Input label="Mot de passe initial" type="password" {...register("password")} error={errors.password?.message} />
          <p className="mt-1 text-xs text-slate-500">Ce mot de passe sera utilisé pour la première connexion de l'utilisateur.</p>
        </div>
      ) : null}

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Rôle</span>
        <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" {...register("role")}>
          <option value="super_admin">super_admin</option>
          <option value="maitre_chant">maitre_chant</option>
          <option value="discipline_admin">discipline_admin</option>
          <option value="choriste">choriste</option>
        </select>
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Voix</span>
        <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" {...register("choirVoice")}>
          <option value="Soprano">Soprano</option>
          <option value="Alto">Alto</option>
          <option value="Ténor">Ténor</option>
          <option value="Basse">Basse</option>
        </select>
      </label>
      <Input label="Téléphone" {...register("phone")} error={errors.phone?.message} />
      <Button type="submit" isLoading={isSubmitting}>
        Enregistrer
      </Button>
    </form>
  );
}
