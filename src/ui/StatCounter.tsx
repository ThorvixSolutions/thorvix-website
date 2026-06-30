interface StatCounterProps {
  value: string;
  suffix: string;
  label: string;
}

export function StatCounter({ value, suffix, label }: StatCounterProps) {
  return (
    <div>
      <div className="font-display text-[38px] text-white tracking-wider">
        {value}<span className="text-accent">{suffix}</span>
      </div>
      <div className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase mt-1">
        {label}
      </div>
    </div>
  );
}
