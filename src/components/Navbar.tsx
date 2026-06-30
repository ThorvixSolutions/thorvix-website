import { useState } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { MobileMenu } from '../ui/MobileMenu';

interface NavbarProps {
  onBookCall: () => void;
}

export function Navbar({ onBookCall }: NavbarProps) {
  const { brand, nav } = useSiteContent();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-[18px] border-b border-border backdrop-blur-lg bg-bg/85 max-md:px-4 max-md:py-3.5 max-md:flex-wrap">
        <img src={brand.logoUrl} alt={brand.name} className="w-[120px] h-10 transition-transform hover:scale-105" />

        <div className="flex gap-4 lg:gap-8 font-mono text-[11px] tracking-[0.1em] text-muted max-md:hidden">
          {nav.links.map(link => (
            <a key={link.href + link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
          ))}
        </div>

        <div
          className="font-mono text-[11px] tracking-[0.12em] border border-accent text-accent px-5 py-2 uppercase cursor-pointer transition-all hover:bg-accent hover:text-black max-md:hidden"
          onClick={onBookCall}
        >
          {nav.ctaLabel}
        </div>

        <button
          className="hidden max-md:flex flex-col justify-center gap-[4px] cursor-pointer p-1 bg-transparent border-none z-[200] ml-auto"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-0.5 bg-white transition-all origin-center ${isMobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-white transition-all origin-center ${isMobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-white transition-all origin-center ${isMobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <MobileMenu
        isOpen={isMobileOpen}
        links={nav.links}
        ctaLabel={nav.ctaLabel}
        onCtaClick={onBookCall}
        onLinkClick={() => setIsMobileOpen(false)}
      />
    </>
  );
}
