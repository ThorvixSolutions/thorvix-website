import { useSiteContent } from '../../hooks/useSiteContent';
import { SectionLabel } from '../../ui/SectionLabel';
import { SectionHeading } from '../../ui/SectionHeading';
import { WhyItem } from './WhyItem';

export function WhySection() {
  const { why } = useSiteContent();

  return (
    <section id="about" className="grid grid-cols-1 border-t border-border lg:grid-cols-2">
      <div className="p-24 border-r border-border sticky top-[60px] h-fit max-lg:static max-lg:border-r-0 max-lg:border-b max-lg:border-border max-lg:p-10 max-sm:p-4 max-sm:py-10">
        <SectionLabel>{why.label}</SectionLabel>
        <SectionHeading lines={why.headingLines} outlineIndex={why.outlineIndex} />
        <div className="font-heading font-light text-[clamp(32px,3.5vw,52px)] leading-[1.1] mt-8 text-[#ccc]">
          {why.quoteParts.map((part, i) =>
            part.bold ? <strong key={i} className="text-white font-black">{part.text}</strong> : <span key={i}>{part.text}</span>
          )}
        </div>
      </div>
      <div className="p-24 max-lg:p-10 max-sm:p-4 max-sm:py-10">
        {why.items.map(item => (
          <WhyItem key={item.num} num={item.num} title={item.title} body={item.body} />
        ))}
      </div>
    </section>
  );
}
