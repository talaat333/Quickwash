import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="film-grain mesh-ink relative overflow-hidden rounded-2xl px-6 py-14 text-center md:px-14 md:py-20">
          <div className="grid-dots-light pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-h1 text-balance text-white">جاهز لتلمع سيارتك من جديد؟</h2>
            <p className="mt-4 text-body-lg text-white/75">
              احجز غسلتك الآن أو اشترك في خطة شهرية، ودعنا نصل إليك أينما كنت.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/booking"><Button size="lg">اطلب غسيل الآن</Button></Link>
              <Link href="/subscription">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:border-white hover:text-white">
                  اشترك شهرياً
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
