import { Section } from "@/components/layout/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { InteriorScene } from "@/components/illustrations/InteriorScene";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  { title: "غسيل جاف ذكي", text: "منتجات متخصصة تنظّف وتلمّع دون خدش الطلاء أو إهدار قطرة ماء." },
  { title: "فريق مدرّب", text: "فنيون محترفون بزي أنيق وأدوات تفصيل دقيقة." },
  { title: "يصل إليك", text: "في البيت أو العمل، في الوقت الذي يناسبك تماماً." },
];

export function About() {
  return (
    <Section id="about" eyebrow="من نحن" title="نعيد تعريف العناية بالسيارة" className="bg-surface">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative">
          <div className="photo-frame relative aspect-[4/5] overflow-hidden rounded-2xl">
            <SmartImage
              slot="aboutInterior"
              overlay
              sizes="(max-width: 1024px) 100vw, 40vw"
              fallback={<InteriorScene className="w-[88%]" />}
            />
          </div>
          <div className="glass absolute -bottom-5 end-5 rounded-xl px-5 py-4 shadow-lift">
            <p className="numeric text-h3 font-semibold text-gradient">+10K</p>
            <p className="text-caption text-text-muted">سيارة تمّت العناية بها</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="max-w-prose text-body-lg leading-loose text-text-secondary">
              بدأنا من فكرة بسيطة: أن تحصل سيارتك على عناية احترافية دون أن تضيّع وقتك أو تهدر المياه.
              نستخدم تقنية الغسيل الجاف ومنتجات عالية الجودة لنمنح سيارتك لمعاناً حقيقياً، بينما نصل نحن إليك.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.05 * i}>
                <div className="border-t-2 border-brand-primary/20 pt-4">
                  <h3 className="text-h4 text-text-primary">{p.title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
