import { useSiteContent } from '../hooks/useSiteContent';

export function Footer() {
  const { brand, footer } = useSiteContent();

  return (
    <footer className="bg-bg-2 border-t border-border py-[60px] px-10 max-md:px-4 max-sm:py-8">
      <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-10 mb-[60px] max-md:grid-cols-1 max-md:gap-8 max-md:mb-8">
        <div>
          <img src={brand.logoUrl} alt={brand.name} className="w-[120px] h-10 mb-2" />
          <div className="text-xs text-muted leading-[1.6] font-light max-w-[200px]">{brand.tagline}</div>
        </div>

        {footer.columns.map((col, i) => (
          <div key={i}>
            {col.title && (
              <div className="font-mono text-xs tracking-[0.2em] uppercase text-muted-2 mb-5">{col.title}</div>
            )}
            {col.links && (
              <div className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <a key={link.label} href={link.href} className="text-base text-muted-3 hover:text-white transition-colors font-light">{link.label}</a>
                ))}
              </div>
            )}
            {col.contact && (
              <div className="font-mono text-xs text-muted-3 leading-8">
                <div><a href={`mailto:${col.contact.email}`} className="text-accent">{col.contact.email}</a></div>
                <div>{col.contact.phone}</div>
                <div>{col.contact.location}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-7 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:items-start">
        <div className="font-mono text-[9px] text-muted-2 tracking-[0.1em]">{footer.copyright}</div>
        <div className="flex gap-6">
          {footer.policyLinks.map(link => (
            <a key={link.label} href={link.href} className="font-mono text-[9px] text-muted-2 tracking-[0.08em] uppercase hover:text-muted transition-colors">{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
