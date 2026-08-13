import { cn } from "@/lib/utils";

/**
 * Art-directed image placeholder.
 * Renders a premium automotive-styled block so the layout is complete without
 * real photography. Replace with <Image /> from next/image once real,
 * professionally shot DRY-detailing photos are dropped into /public/images.
 * Never use wet-wash / water imagery.
 */
export function Media({
  label,
  className,
  ratio = "aspect-[4/3]",
  tone = "light",
}: {
  label?: string;
  className?: string;
  ratio?: string;
  tone?: "light" | "dark" | "brand";
}) {
  const tones = {
    light: "bg-surface-muted text-text-muted",
    dark: "bg-ink text-text-on-ink/60",
    brand: "bg-brand-primary/10 text-brand-primary",
  } as const;
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", ratio, tones[tone], className)}>
      <div className="polish-sheen absolute inset-0" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-2 opacity-60">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 13l1.6-4.8A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.2L20 13" />
            <path d="M3 17h18v-4H3z" />
            <circle cx="7" cy="17" r="1.6" />
            <circle cx="17" cy="17" r="1.6" />
          </svg>
          {label && <span className="text-caption">{label}</span>}
        </div>
      </div>
    </div>
  );
}
