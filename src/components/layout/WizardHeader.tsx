import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function WizardHeader() {
  return (
    <header className="sticky top-0 z-sticky border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-content items-center justify-between px-6 lg:px-8" style={{ height: 72 }}>
        <Logo />
        <Link href="/" data-cursor="link" className="flex items-center gap-2 text-body-sm text-text-secondary transition-colors hover:text-text-primary">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          الرئيسية
        </Link>
      </div>
    </header>
  );
}
