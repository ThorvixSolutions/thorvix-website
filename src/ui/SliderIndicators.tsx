import { cn } from '../utils/cn';

interface SliderIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function SliderIndicators({ count, activeIndex, onSelect }: SliderIndicatorsProps) {
  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={cn(
            'h-2 rounded-full cursor-pointer transition-all duration-300 border border-transparent',
            'hover:bg-muted-3',
            i === activeIndex
              ? 'bg-accent w-7 rounded-sm shadow-[0_0_12px_rgba(200,240,50,0.5)]'
              : 'w-2 bg-border-bright'
          )}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
