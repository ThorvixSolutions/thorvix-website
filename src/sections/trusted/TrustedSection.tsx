import { useSiteContent } from '../../hooks/useSiteContent';
import { Marquee } from '../../ui/Marquee';

export function TrustedSection() {
  const { trusted } = useSiteContent();

  const items = trusted.logos.map(logo => (
    <span key={logo.name} className="inline-flex items-center gap-3 px-12 border-r border-border font-heading font-semibold text-xl uppercase text-white grayscale hover:grayscale-0 transition-colors">
      <img src={logo.imageUrl} alt={logo.name} width={40} height={40} className="opacity-100" />
      {logo.name}
      <span className="font-mono text-[9px] text-muted-2 border border-border px-1.5 py-0.5">{logo.tag}</span>
    </span>
  ));

  return (
    <div className="border-t border-b border-border whitespace-nowrap bg-bg py-10 overflow-hidden relative">
      <div className="font-mono text-[10px]  uppercase text-muted text-center mb-7">
        <span className="text-accent">&#10022;</span> {trusted.label}
      </div>
      <div className="overflow-hidden" style={{
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}>
        <Marquee items={items} speed={25} />
      </div>
    </div>
  );
}
