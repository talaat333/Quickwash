import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * LOGO PLACEHOLDER.
 * Replace the mark + wordmark with the real brand asset when provided
 * (drop an SVG/PNG into /public/logos and swap the markup below).
 */
export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      data-cursor="link"
      aria-label={siteConfig.name}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-md bg-brand-primary text-text-on-brand"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
          <path d="M4 17h16v-4H4z" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
          <path d="M18 6l.6 1.4L20 8l-1.4.6L18 10l-.6-1.4L16 8l1.4-.6z" />
        </svg>
      </span>
      <span className={cn("text-h4 font-semibold tracking-tight", onDark ? "text-text-on-ink" : "text-text-primary")}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
