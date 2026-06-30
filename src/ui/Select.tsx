import { cn } from '../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted font-medium">{label}</label>
      <select
        className={cn(
          'bg-bg-3 border border-border-bright text-white px-4 py-3 font-body text-sm transition-colors focus:border-accent outline-none',
          className
        )}
        {...props}
      >
        <option value="">{props.placeholder || 'Select an option'}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
