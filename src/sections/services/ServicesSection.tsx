import { useSiteContent } from '../../hooks/useSiteContent';
import { SectionLabel } from '../../ui/SectionLabel';
import { SectionHeading } from '../../ui/SectionHeading';
import { ServiceCard } from './ServiceCard';

export function ServicesSection() {
  const { services } = useSiteContent();

  return (
    <section id="services" className="py-24 px-10 border-t border-border max-md:py-10 max-md:px-4">
      <div className="grid grid-cols-2 gap-10 mb-16 items-end max-md:grid-cols-1 max-md:gap-6 max-md:mb-8">
        <div>
          <SectionLabel>{services.label}</SectionLabel>
          <SectionHeading lines={services.headingLines} outlineIndex={services.outlineIndex} />
        </div>
        <p className="text-[15px] leading-[1.8] text-muted max-w-[380px] justify-self-end max-md:justify-self-start">
          {services.intro}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {services.cards.map((card) => (
          <ServiceCard
            key={card.num}
            num={card.num}
            title={card.title}
            desc={card.desc}
            featured={card.featured}
          />
        ))}
      </div>
    </section>
  );
}
