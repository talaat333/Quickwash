import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { CarSide } from "@/components/illustrations/CarSide";
import { benefits } from "@/data/benefits";
import { cn } from "@/lib/utils";

/** Asymmetric bento: one featured photo benefit + supporting cells. */
export function Benefits() {
  const [featured, ...rest] = benefits;
  return (
    <Section eyebrow="لماذا نحن" title="عناية تستحقها سيارتك" className="bg-background">
      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <Reveal className="md:row-span-2">
          <div className="relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl">
            <SmartImage
              slot="benefitFeature"
              className="absolute inset-0"
              sizes="(max-width: 768px) 100vw, 33vw"
              fallback={<div className="stage-ink flex h-full w-full items-center justify-center"><CarSide variant="suv" paint="graphite" className="w-[78%]" /></div>}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="relative p-8">
              <h3 className="text-h3 text-white">{featured.title}</h3>
              <p className="mt-2 max-w-xs text-body-sm text-white/75">{featured.description}</p>
            </div>
          </div>
        </Reveal>

        {rest.map((b, i) => (
          <Reveal key={b.id} delay={0.05 * i} className={cn(i === 0 && "md:col-span-2")}>
            <div className="ring-premium flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
              <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <h3 className="text-h4 text-text-primary">{b.title}</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">{b.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
