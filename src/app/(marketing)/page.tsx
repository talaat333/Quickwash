import { Hero } from "@/components/marketing/Hero";
import { Marquee } from "@/components/marketing/Marquee";
import { About } from "@/components/marketing/About";
import { ServicesShowcase } from "@/components/marketing/ServicesShowcase";
import { Benefits } from "@/components/marketing/Benefits";
import { AppPromotion } from "@/components/marketing/AppPromotion";
import { Reviews } from "@/components/marketing/Reviews";
import { Faq } from "@/components/marketing/Faq";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Contact } from "@/components/marketing/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <ServicesShowcase />
      <Benefits />
      <AppPromotion />
      <Reviews />
      <Faq />
      <CtaBand />
      <Contact />
    </>
  );
}
