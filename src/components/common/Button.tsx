import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-300",
  secondary: "bg-accent-500 text-brand-900 hover:bg-accent-700 hover:text-white focus:ring-accent-300",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-100 dark:text-brand-100 dark:hover:bg-brand-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-300",
};

export function Button({
  className,
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Chargement..." : children}
    </button>
  );
}
