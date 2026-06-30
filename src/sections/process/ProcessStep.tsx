import { cn } from '../../utils/cn';

interface ProcessStepProps {
  num: string;
  title: string;
  body: string;
  isLast: boolean;
  isMiddle: boolean;
}

export function ProcessStep({ num, title, body, isLast, isMiddle }: ProcessStepProps) {
  return (
    <div className="how-step bg-bg-2 p-8 relative md:p-8 sm:p-4">
      <span className="font-display text-[80px] text-muted-2 leading-none block mb-2 sm:text-[64px]">{num}</span>
      <div className="font-heading font-bold text-xl uppercase tracking-[0.05em] mb-4 text-white max-sm:text-base">{title}</div>
      <div className="text-[13px] leading-[1.8] text-muted font-light max-sm:text-xs">{body}</div>
      {!isLast && (
        <div className="absolute top-14 right-[-1px] w-10 h-0.5 bg-accent z-[1] max-md:hidden" />
      )}
    </div>
  );
}
