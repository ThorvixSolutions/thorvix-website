import { useSiteContent } from '../../hooks/useSiteContent';
import { SectionLabel } from '../../ui/SectionLabel';
import { SectionHeading } from '../../ui/SectionHeading';
import { CaseCard } from './CaseCard';

export function CasesSection() {
  const { cases } = useSiteContent();

  return (
    <section id="cases" className="py-24 px-10 border-t border-border max-md:py-10 max-md:px-4">
      <SectionLabel>{cases.label}</SectionLabel>
      <SectionHeading lines={cases.headingLines} outlineIndex={cases.outlineIndex} />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-px bg-border mt-16 md:mt-8">
        {cases.cards.map(card => (
          <CaseCard
            key={card.industry}
            industry={card.industry}
            metric={card.metric}
            metricLabel={card.metricLabel}
            quote={card.quote}
          />
        ))}
      </div>
    </section>
  );
}
