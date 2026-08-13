import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const inputBase =
  "h-12 w-full rounded-md border bg-surface px-4 text-body-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 outline-none focus:border-brand-primary focus:shadow-focus disabled:bg-surface-muted disabled:opacity-60";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(inputBase, invalid && "border-error focus:border-error", className)}
      {...props}
    />
  );
});
