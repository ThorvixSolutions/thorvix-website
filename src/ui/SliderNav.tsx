import { cn } from '../utils/cn';

interface SliderNavProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  className?: string;
}

export function SliderNav({ direction, onClick, className }: SliderNavProps) {
  const char = direction === 'prev' ? '\u276E' : '\u276F';

  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-bg/90 border border-border-bright text-white',
        'cursor-pointer flex items-center justify-center text-2xl z-10 select-none',
        'transition-all duration-300 hover:bg-bg-3 hover:border-accent hover:text-accent',
        'hover:scale-105 active:scale-95',
        direction === 'prev' ? 'left-0' : 'right-0',
        className
      )}
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
    >
      {char}
    </button>
  );
}
