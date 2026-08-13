import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StateScreenProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "neutral" | "error";
  className?: string;
}

/** Centered state layout used for empty / error / offline / not-found screens. */
export function StateScreen({ icon, title, description, action, tone = "neutral", className }: StateScreenProps) {
  return (
    <div className={cn("mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center", className)}>
      {icon && (
        <div
          className={cn(
            "mb-6 grid h-16 w-16 place-items-center rounded-full",
            tone === "error" ? "bg-error/10 text-error" : "bg-surface-tint text-brand-primary",
          )}
        >
          {icon}
        </div>
      )}
      <h1 className="text-h3 text-text-primary">{title}</h1>
      {description && <p className="mt-3 text-body-sm leading-relaxed text-text-secondary">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
