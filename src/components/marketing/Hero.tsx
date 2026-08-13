import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { CarSide } from "@/components/illustrations/CarSide";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "0", label: "لتر ماء لكل غسلة" },
  { value: "60", label: "دقيقة للطلب الفوري" },
  { value: "4.9", label: "متوسط تقييم العملاء" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="polish-sheen pointer-events-none absolute inset-0 -z-10" />
      <div className="grid-dots pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <Container>
        <div className="grid items-center gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20">
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface/80 px-4 py-1.5 text-label text-text-secondary backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-secondary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-secondary" />
                </span>
                غسيل جاف • بدون ماء • يصل إليك
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-display text-balance text-text-primary">
                عناية احترافية بسيارتك،{" "}
                <span className="text-gradient">أينما كنت</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-prose text-body-lg text-text-secondary">
                تجربة متكاملة للعناية بسيارتك بتقنيات الغسيل الجاف ومنتجات احترافية،
                نصل إليك في المكان والوقت المناسبين.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/booking"><Button size="lg">اطلب غسيل الآن</Button></Link>
                <Link href="/#services"><Button size="lg" variant="outline">اكتشف خدماتنا</Button></Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="numeric text-h2 font-semibold text-text-primary">{s.value}</dt>
                    <dd className="mt-1 text-caption text-text-secondary">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-2xl">
              <SmartImage
                slot="heroCar"
                priority
                overlay
                sizes="(max-width: 1024px) 100vw, 45vw"
                fallback={<CarSide variant="sedan" paint="green" className="w-[86%]" />}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="glass flex items-center gap-3 rounded-xl p-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-white">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <div>
                    <p className="text-body-sm font-semibold text-text-primary">الفني في الطريق</p>
                    <p className="text-caption text-text-muted">وصول خلال 60 دقيقة</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass absolute -top-4 end-4 hidden rounded-xl px-4 py-3 shadow-lift md:block">
              <p className="text-caption text-text-muted">توفير المياه</p>
              <p className="numeric text-h4 font-semibold text-gradient">150+ لتر</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
