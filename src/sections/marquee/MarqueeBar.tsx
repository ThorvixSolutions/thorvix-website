import { useSiteContent } from '../../hooks/useSiteContent';
import { Marquee } from '../../ui/Marquee';

export function MarqueeBar() {
  const { marqueeItems } = useSiteContent();

  const items = marqueeItems.map(text => (
    <span key={text} className="font-display text-[22px] tracking-[0.1em] text-black px-8 flex items-center gap-6 after:content-['\u2726'] after:text-sm">
      {text}
    </span>
  ));

  return (
    <div className="bg-accent py-3.5 overflow-hidden whitespace-nowrap border-t border-border">
      <Marquee items={items} speed={20} />
    </div>
  );
}
