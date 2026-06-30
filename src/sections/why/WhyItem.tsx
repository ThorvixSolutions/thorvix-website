interface WhyItemProps {
  num: string;
  title: string;
  body: string;
}

export function WhyItem({ num, title, body }: WhyItemProps) {
  return (
    <div className="why-item py-9 border-b border-border grid grid-cols-[80px_1fr] gap-6 items-start bg-bg-2 first:border-t group">
      <div className="font-display text-[52px] text-muted-3 text-center leading-none transition-colors group-hover:text-accent">
        {num}
      </div>
      <div>
        <div className="font-heading font-bold text-xl uppercase tracking-[0.05em] mb-2">{title}</div>
        <div className="text-[13px] leading-[1.7] text-muted-2 font-light">{body}</div>
      </div>
    </div>
  );
}
