import { useSiteContent } from '../../hooks/useSiteContent';
import { Button } from '../../ui/Button';
import { StatCounter } from '../../ui/StatCounter';

interface HeroSectionProps {
  onBookCall: () => void;
}

export function HeroSection({ onBookCall }: HeroSectionProps) {
  const { hero } = useSiteContent();

  return (
    <section className="hero-section min-h-screen relative pt-16 overflow-hidden">
      <div className="px-10 py-20 flex flex-col justify-center mx-auto max-w-[800px] w-full relative">
        <div className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-accent" />
          {hero.tag}
        </div>

        <h1 className="font-heading font-black text-[clamp(64px,8vw,120px)] leading-[0.92] tracking-tight uppercase mb-8">
          {hero.headline.line1} <em className="not-italic text-accent">{hero.headline.accent}</em>
          <br />
          <span className="outline-text">{hero.headline.line2}</span>
        </h1>

        <p className="text-[15px] leading-[1.7] text-muted max-w-[420px] mb-12 font-light">
          {hero.sub}
        </p>

        <div className="flex gap-4 items-center max-md:flex-col max-md:w-full">
          <Button variant="primary" onClick={onBookCall} className="max-md:w-full max-md:text-center">
            {hero.primaryCta}
          </Button>
          <Button
            variant="ghost"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="max-md:w-full max-md:text-center"
          >
            {hero.ghostCta}
          </Button>
        </div>

        <div className="mt-16 flex border-t border-border max-w-[600px]">
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 py-6 ${i < hero.stats.length - 1 ? 'border-r border-border' : ''} ${i > 0 ? 'pl-6' : ''}`}
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
