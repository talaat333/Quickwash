import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-200 ease-premium select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:shadow-focus whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary !text-white hover:bg-brand-primary-hover active:translate-y-px shadow-subtle hover:shadow-card",
  secondary:
    "bg-ink !text-white hover:bg-ink/90 active:translate-y-px",
  outline:
    "border border-border-strong text-text-primary hover:border-brand-primary hover:text-brand-primary bg-transparent",
  ghost: "text-text-primary hover:bg-surface-muted",
  destructive: "bg-error !text-white hover:bg-error/90 active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-body-sm",
  md: "h-11 px-6 text-body-sm",
  lg: "h-13 px-8 text-body py-3.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, iconStart, iconEnd, fullWidth, className, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      data-cursor="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {!loading && iconStart}
      {children}
      {!loading && iconEnd}
    </button>
  );
});
