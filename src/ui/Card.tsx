import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  featured?: boolean;
  className?: string;
}

export function Card({ children, featured, className }: CardProps) {
  return (
    <div className={cn(
      'bento-card p-9 relative overflow-hidden transition-colors duration-300 cursor-default group',
      featured ? 'bg-accent' : 'bg-bg-2 hover:bg-bg-3',
      'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-400',
      'hover:after:scale-x-100',
      className
    )}>
      {children}
    </div>
  );
}
