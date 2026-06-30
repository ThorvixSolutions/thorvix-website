interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  mask?: boolean;
}

export function Marquee({ items, speed = 28, className, itemClassName, mask }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={className}
      style={mask ? {
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      } : undefined}
    >
      <div
        className="inline-flex"
        style={{ animation: `ticker ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className={itemClassName}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
