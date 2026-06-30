import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted font-medium">{label}</label>
      <input
        className={cn(
          'bg-bg-3 border border-border-bright text-white px-4 py-3 font-body text-sm transition-colors focus:border-accent outline-none',
          className
        )}
        {...props}
      />
    </div>
  );
}
