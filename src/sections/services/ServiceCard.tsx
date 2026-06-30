import { cn } from '../../utils/cn';
import { Card } from '../../ui/Card';

interface ServiceCardProps {
  num: string;
  title: string;
  desc: string;
  featured?: boolean;
}

export function ServiceCard({ num, title, desc, featured }: ServiceCardProps) {
  return (
    <Card featured={featured} className="text-left">
      <div className={cn('font-mono text-[10px] mb-10 tracking-[0.1em]', featured ? 'text-black' : 'text-muted')}>
        {num}
      </div>
      <div className={cn('font-heading font-bold text-[22px] uppercase tracking-[0.05em] mb-3', featured ? 'text-black' : 'text-white')}>
        {title}
      </div>
      <div className={cn('text-[13px] leading-[1.6] font-light', featured ? 'text-[#333]' : 'text-muted-2')}>
        {desc}
      </div>
      <div className={cn('absolute bottom-7 right-7 text-xl transition-all duration-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1', featured ? 'text-black' : 'text-muted')}>
        &#8599;
      </div>
    </Card>
  );
}
