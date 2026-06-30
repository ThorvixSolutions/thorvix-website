import { useSiteContent } from '../../hooks/useSiteContent';
import { Marquee } from '../../ui/Marquee';

export function TickerBar() {
  const { tickerItems } = useSiteContent();

  const items = tickerItems.map(text => (
    <span key={text} className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted px-10 border-r border-border">
      <span className="text-accent mr-2">&#10022;</span>{text}
    </span>
  ));

  return (
    <div className="border-t border-b border-border bg-bg-2 overflow-hidden py-3 whitespace-nowrap">
      <Marquee items={items} speed={28} />
    </div>
  );
}
