import { Container } from "@/components/layout/Container";
import { PhoneMockup } from "@/components/illustrations/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

const features = [
  "احجز غسيل",
  "تابع طلبك",
  "إدارة اشتراكك",
  "إدارة سياراتك",
  "العناوين المحفوظة",
  "الإشعارات",
  "سجل الطلبات",
];

export function AppPromotion() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="film-grain mesh-ink relative overflow-hidden rounded-2xl px-6 py-14 md:px-14">
          <div className="grid-dots-light pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <h2 className="text-h1 text-balance text-white">كل خدماتنا في تطبيق واحد</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-4 max-w-md text-body-lg text-white/70">
                  احجز، تابع، وأدر اشتراكك وسياراتك من مكان واحد — بتجربة سلسة أينما كنت.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 grid max-w-md grid-cols-2 gap-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-body-sm text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={siteConfig.appStoreUrl} className="flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-body-sm text-white transition-colors hover:border-brand-secondary" data-cursor="button">
                    App Store
                  </a>
                  <a href={siteConfig.googlePlayUrl} className="flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-body-sm text-white transition-colors hover:border-brand-secondary" data-cursor="button">
                    Google Play
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-56 md:w-64">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-brand-secondary/25 blur-3xl" />
                <PhoneMockup className="w-full drop-shadow-2xl" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
