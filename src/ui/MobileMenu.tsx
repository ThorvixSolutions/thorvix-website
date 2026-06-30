import { cn } from '../utils/cn';

interface MobileMenuProps {
  isOpen: boolean;
  links: { label: string; href: string }[];
  ctaLabel: string;
  onCtaClick: () => void;
  onLinkClick: () => void;
}

export function MobileMenu({ isOpen, links, ctaLabel, onCtaClick, onLinkClick }: MobileMenuProps) {
  return (
    <div className={cn(
      'fixed inset-0 bg-bg/[0.98] z-[99] flex-col items-center justify-center gap-8',
      'backdrop-blur-lg transition-all duration-300',
      isOpen ? 'flex opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
    )}>
      <div className="flex flex-col items-center gap-6">
        {links.map(link => (
          <a
            key={link.href + link.label}
            href={link.href}
            className="font-mono text-sm tracking-[0.2em] text-muted uppercase transition-colors hover:text-white"
            onClick={onLinkClick}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div
        className="font-mono text-[13px] tracking-[0.12em] border border-accent text-accent px-9 py-3.5 cursor-pointer uppercase transition-all hover:bg-accent hover:text-black mt-4"
        onClick={() => { onCtaClick(); onLinkClick(); }}
      >
        {ctaLabel}
      </div>
    </div>
  );
}
