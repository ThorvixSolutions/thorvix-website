import { useSiteContent } from '../../hooks/useSiteContent';
import { SectionLabel } from '../../ui/SectionLabel';
import { SectionHeading } from '../../ui/SectionHeading';
import { ProcessStep } from './ProcessStep';

export function ProcessSection() {
  const { process } = useSiteContent();

  return (
    <section className="py-24 px-10 border-t border-border max-md:py-10 max-md:px-4">
      <SectionLabel>{process.label}</SectionLabel>
      <SectionHeading lines={process.headingLines} outlineIndex={process.outlineIndex} />
      <div className="grid grid-cols-1 gap-px bg-border mt-16 md:grid-cols-1 lg:grid-cols-3 max-md:mt-10">
        {process.steps.map((step, i) => (
          <ProcessStep
            key={step.num}
            num={step.num}
            title={step.title}
            body={step.body}
            isLast={i === process.steps.length - 1}
            isMiddle={i === 1}
          />
        ))}
      </div>
    </section>
  );
}
