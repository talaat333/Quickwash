import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...props },
  ref,
) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-body-sm text-text-primary">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0 rounded border-border-strong text-brand-primary accent-brand-primary focus-visible:shadow-focus",
          className,
        )}
        {...props}
      />
      {label && <span className="leading-relaxed">{label}</span>}
    </label>
  );
});
