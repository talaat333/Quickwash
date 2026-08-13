"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { reviews } from "@/data/reviews";
import type { Review } from "@/types/domain";

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    // In RTL, positive scrollLeft moves toward the start visually; use logical step.
    el.scrollBy({ left: dir * 360 * (document.dir === "rtl" ? -1 : 1), behavior: "smooth" });
  }

  return (
    <section className="bg-background py-20 md:py-24">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <header className="max-w-prose">
            <span className="eyebrow-rule mb-3 inline-block text-label uppercase tracking-widest text-brand-primary">آراء عملائنا</span>
            <h2 className="text-h2 text-balance text-text-primary">تجارب حقيقية، رضا حقيقي</h2>
          </header>
          <div className="hidden gap-2 md:flex">
            <CarouselButton dir="prev" onClick={() => scrollBy(-1)} />
            <CarouselButton dir="next" onClick={() => scrollBy(1)} />
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="w-[300px] shrink-0 snap-start rounded-lg border border-border bg-surface p-6 sm:w-[340px]">
      <div className="flex items-center gap-1 text-brand-secondary" aria-label={`تقييم ${review.rating} من 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" />
          </svg>
        ))}
      </div>
      <p className="mt-4 text-body-sm leading-loose text-text-primary">{review.text}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-tint text-body-sm font-semibold text-brand-primary">
          {review.name.charAt(0)}
        </span>
        <div>
          <p className="text-body-sm font-semibold text-text-primary">{review.name}</p>
          <p className="text-caption text-text-muted">{review.service}</p>
        </div>
      </div>
    </article>
  );
}

function CarouselButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      data-cursor="button"
      aria-label={dir === "prev" ? "السابق" : "التالي"}
      className="grid h-11 w-11 place-items-center rounded-full border border-border text-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}
      </svg>
    </button>
  );
}
