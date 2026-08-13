import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "warning" | "error" | "info" | "brand";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-text-secondary",
  success: "bg-brand-primary/10 text-brand-primary",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-info/10 text-info",
  brand: "bg-brand-primary text-text-on-brand",
};

export function StatusBadge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-caption font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
