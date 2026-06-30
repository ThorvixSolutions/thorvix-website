import { cn } from '../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted font-medium">{label}</label>
      <textarea
        className={cn(
          'bg-bg-3 border border-border-bright text-white px-4 py-3 font-body text-sm font-light transition-colors focus:border-accent outline-none resize-vertical min-h-[100px]',
          className
        )}
        {...props}
      />
    </div>
  );
}
