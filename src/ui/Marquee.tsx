import { useEffect, useRef, useState } from 'react';

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  mask?: boolean;
}

export function Marquee({ items, speed = 28, className, itemClassName, mask }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(1);

  // Repeat the item set enough times to always overflow the container so the
  // -50% translate never exposes a gap, no matter how few items there are.
  useEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group || items.length === 0) return;

    const measure = () => {
      const singleWidth = group.scrollWidth / copies;
      if (!singleWidth) return;
      const next = Math.max(1, Math.ceil(container.offsetWidth / singleWidth) + 1);
      setCopies(prev => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(group);
    return () => observer.disconnect();
  }, [items, copies]);

  const group = Array.from({ length: copies }).flatMap((_, c) =>
    items.map((item, i) => (
      <div key={`${c}-${i}`} className={itemClassName}>
        {item}
      </div>
    ))
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={mask ? {
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      } : undefined}
    >
      <div
        className="inline-flex"
        // Duration scales with the copy count so the on-screen speed (px/sec)
        // stays constant regardless of how many items fill the row.
        style={{ animation: `ticker ${speed * copies}s linear infinite`, willChange: 'transform' }}
      >
        <div ref={groupRef} className="inline-flex">
          {group}
        </div>
        <div className="inline-flex" aria-hidden>
          {group}
        </div>
      </div>
    </div>
  );
}
