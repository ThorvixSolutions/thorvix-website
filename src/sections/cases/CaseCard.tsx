interface CaseCardProps {
  industry: string;
  metric: string;
  metricLabel: string;
  quote: string;
}

export function CaseCard({ industry, metric, metricLabel, quote }: CaseCardProps) {
  return (
    <div className="case-card bg-bg-2 p-11 relative overflow-hidden transition-colors hover:bg-bg-3">
      <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted mb-8">{industry}</div>
      <div className="font-display text-[72px] leading-none text-accent mb-2 tracking-wider max-sm:text-[48px]">{metric}</div>
      <div className="font-heading font-bold text-sm uppercase tracking-[0.1em] text-white mb-6">{metricLabel}</div>
      <div className="text-[13px] leading-[1.7] text-muted italic border-t border-border pt-6 mt-6">{quote}</div>
    </div>
  );
}
