import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span> : null}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-900",
          error && "border-rose-500 focus:border-rose-500 focus:ring-rose-200",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </label>
  );
});
