import { cn } from '../../utils/cn';

interface TeamCardProps {
  num: string;
  name: string;
  role: string;
  focus: string;
  imageUrl: string;
  isActive: boolean;
}

export function TeamCard({ num, name, role, focus, imageUrl, isActive }: TeamCardProps) {
  return (
    <div className={cn(
      'team-card flex-shrink-0 bg-bg-2 relative overflow-hidden transition-all duration-300 cursor-default',
      'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-400',
      'hover:after:scale-x-100 hover:bg-bg-3',
      isActive ? 'scale-100 opacity-100 z-[2]' : 'scale-[0.8] opacity-85 z-[1] blur-[1.1px] saturate-[0.85]',
    )}
      style={{ flex: '0 0 calc((100% - 48px) / 3)' }}
    >
      <div className="aspect-square bg-bg-3 border-b border-border flex items-end justify-center overflow-hidden relative" style={{
        background: 'radial-gradient(110% 80% at 50% 0%, rgba(200, 240, 50, 0.06), transparent 60%), var(--bg3)',
      }}>
        <span className="absolute top-3.5 left-4 z-[2] font-mono text-[15px] tracking-[0.16em] text-[#e6f700]">{num}</span>
        <svg viewBox="0 0 200 200" fill="currentColor" className="text-muted-3/30 w-full h-full absolute" aria-hidden="true">
          <circle cx="100" cy="76" r="38" />
          <path d="M100 122c-44 0-72 26-72 62v16h144v-16c0-36-28-62-72-62z" />
        </svg>
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="absolute w-full h-full object-cover z-[1] drop-shadow-[0_8px_16px_rgba(0,0,0,0.24)] transition-transform duration-400 hover:scale-[1.02]"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div className="p-6 pb-[30px]">
        <div className="font-heading font-bold text-lg text-white">{name}</div>
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-accent my-2 leading-[1.6]">{role}</div>
        <div className="text-[13px] leading-[1.65] text-muted">
          <b className="block font-mono font-normal text-[9px] tracking-[0.18em] uppercase text-muted-2 mb-1.5">Focus</b>
          {focus}
        </div>
      </div>
    </div>
  );
}
