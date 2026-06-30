import { useSiteContent } from '../../hooks/useSiteContent';
import { Button } from '../../ui/Button';

interface CtaSectionProps {
  onBookCall: () => void;
}

export function CtaSection({ onBookCall }: CtaSectionProps) {
  const { cta } = useSiteContent();

  return (
    <section className="py-[120px] px-10 border-t border-border max-md:py-20 max-sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative overflow-hidden">
        <div>
          <h2 className="font-heading font-black text-[clamp(48px,6vw,88px)] uppercase leading-[0.92] relative z-[1]">
            {cta.headingLines[0]}<br />
            <em className="not-italic text-accent block">{cta.headingLines[1]}</em>
          </h2>
          <p className="text-sm text-[#666] mt-5 font-light max-w-[440px]">{cta.sub}</p>
        </div>
        <div className="flex flex-col gap-3 relative z-[1] items-end max-md:items-stretch max-md:w-full">
          <Button variant="large" onClick={onBookCall} className="max-md:w-full max-md:text-center">
            {cta.buttonLabel}
          </Button>
          <div className="font-mono text-[9px] text-muted tracking-[0.1em] text-right max-md:text-left">{cta.note}</div>
        </div>
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 font-display text-[200px] leading-none -webkit-text-stroke-[1px]  pointer-events-none whitespace-nowrap max-sm:text-[120px] max-sm:-right-10" style={{
          WebkitTextStroke: '1px var(--border)',
          color: 'transparent',
        }}>
          {cta.bgText}
        </div>
      </div>
    </section>
  );
}
