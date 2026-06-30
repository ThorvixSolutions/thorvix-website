import { cn } from '../utils/cn';

interface SectionHeadingProps {
  lines: string[];
  outlineIndex: number;
  className?: string;
}

export function SectionHeading({ lines, outlineIndex, className }: SectionHeadingProps) {
  return (
    <h2 className={cn(
      'font-heading font-black text-[clamp(42px,5vw,72px)] uppercase leading-[0.95] tracking-tight',
      className
    )}>
      {lines.map((line, i) => (
        <span key={i}>
          {i === outlineIndex ? (
            <span className="outline-text-muted">{line}</span>
          ) : (
            <>{line}</>
          )}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
}
