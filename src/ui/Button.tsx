import { cn } from '../utils/cn';

interface ButtonProps {
  variant: 'primary' | 'ghost' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({ variant, children, onClick, className }: ButtonProps) {
  const base = 'cursor-pointer transition-all uppercase tracking-widest';
  const variants = {
    primary: 'bg-accent text-black border-2 border-accent font-heading font-bold text-sm px-8 py-3.5 hover:bg-transparent hover:text-accent',
    ghost: 'border border-border-bright text-muted font-heading font-semibold text-sm px-8 py-3.5 hover:border-white hover:text-white',
    large: 'btn-large bg-accent text-black border-2 border-accent font-heading font-bold text-base px-11 py-5 hover:bg-transparent hover:text-accent whitespace-nowrap',
  };

  return (
    <button className={cn(base, variants[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}
