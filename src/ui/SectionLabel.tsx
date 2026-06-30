import { cn } from '../utils/cn';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn(
      'font-mono text-[10px] tracking-[0.2em] text-accent uppercase mb-5 flex items-center gap-3',
      className
    )}>
      <span className="w-6 h-px bg-accent" />
      {children}
    </div>
  );
}
