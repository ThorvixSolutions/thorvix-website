import { useState } from 'react';
import { HeroCanvas } from '../sections/hero/HeroCanvas';
import { HeroSection } from '../sections/hero/HeroSection';
import { TrustedSection } from '../sections/trusted/TrustedSection';
import { ServicesSection } from '../sections/services/ServicesSection';
import { MarqueeBar } from '../sections/marquee/MarqueeBar';
import { WhySection } from '../sections/why/WhySection';
import { TickerBar } from '../sections/ticker/TickerBar';
import { ProcessSection } from '../sections/process/ProcessSection';
import { SolutionsSection } from '../sections/solutions/SolutionsSection';
import { TeamSection } from '../sections/team/TeamSection';
import { CasesSection } from '../sections/cases/CasesSection';
import { TestimonialsSection } from '../sections/testimonials/TestimonialsSection';
import { CtaSection } from '../sections/cta/CtaSection';
import { MainLayout } from '../layouts/MainLayout';
import { BookingModal } from '../components/BookingModal';
import { ScrollBolt } from '../components/ScrollBolt';

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeroCanvas />
      <ScrollBolt />
      <MainLayout onBookCall={() => setIsModalOpen(true)}>
        <HeroSection onBookCall={() => setIsModalOpen(true)} />
        <TrustedSection />
        <ServicesSection />
        <MarqueeBar />
        <WhySection />
        <TickerBar />
        <ProcessSection />
        <SolutionsSection />
        <TeamSection />
        <CasesSection />
        <TestimonialsSection />
        <CtaSection onBookCall={() => setIsModalOpen(true)} />
      </MainLayout>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
