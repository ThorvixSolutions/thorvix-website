interface TestimonialSlideProps {
  quote: string;
  attribution: string;
  location: string;
}

export function TestimonialSlide({ quote, attribution, location }: TestimonialSlideProps) {
  return (
    <div className="w-full flex-shrink-0 text-center px-8 sm:px-10 md:px-16">
      <div
        className="font-heading font-light text-[clamp(20px,3vw,42px)] leading-[1.3] text-[#ccc] mb-6 max-md:mb-4"
        dangerouslySetInnerHTML={{ __html: quote }}
      />
      <div className="font-mono text-[10px] sm:text-[11px] text-muted tracking-[0.12em] uppercase">
        &mdash; {attribution}
        <span className="mx-2 text-muted-3">|</span>
        {location}
      </div>
    </div>
  );
}
