import { cn } from '../utils/cn';

interface TabBarProps {
  tabs: { id: string; num: string; title: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function TabBar({ tabs, activeId, onSelect, orientation = 'vertical', className }: TabBarProps) {
  return (
    <div className={cn(
      orientation === 'vertical' ? 'border-r border-border' : '',
      className
    )}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={cn(
            'p-5 border-b border-border cursor-pointer transition-colors relative',
            orientation === 'horizontal' && 'border-r',
            tab.id === activeId && 'bg-bg-3',
            'hover:bg-bg-3'
          )}
          onClick={() => onSelect(tab.id)}
        >
          {tab.id === activeId && (
            <div className={cn(
              'absolute bg-accent',
              orientation === 'vertical' ? 'left-0 top-0 bottom-0 w-[3px]' : 'bottom-0 left-0 right-0 h-[3px]'
            )} />
          )}
          <div className={cn(
            'font-mono text-[9px] tracking-[0.1em] mb-1.5',
            tab.id === activeId ? 'text-accent' : 'text-muted-3'
          )}>
            {tab.num}
          </div>
          <div className={cn(
            'font-heading font-bold text-base uppercase tracking-[0.05em]',
            tab.id === activeId ? 'text-white' : 'text-muted-3'
          )}>
            {tab.title}
          </div>
        </div>
      ))}
    </div>
  );
}
