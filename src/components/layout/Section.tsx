import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  bleed?: boolean;
}

export function Section({ id, className, containerClassName, children, eyebrow, title, description, bleed }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-24", className)}>
      {bleed ? (
        children
      ) : (
        <Container className={containerClassName}>
          {(eyebrow || title || description) && (
            <header className="mb-12 max-w-prose md:mb-16">
              {eyebrow && (
                <span className="eyebrow-rule mb-3 inline-block text-label uppercase tracking-widest text-brand-primary">
                  {eyebrow}
                </span>
              )}
              {title && <h2 className="text-h2 text-balance text-text-primary">{title}</h2>}
              {description && <p className="mt-4 text-body-lg text-text-secondary">{description}</p>}
            </header>
          )}
          {children}
        </Container>
      )}
    </section>
  );
}
