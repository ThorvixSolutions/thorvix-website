import { useState, useEffect, useRef, useCallback } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { SliderIndicators } from '../../ui/SliderIndicators';
import { TestimonialSlide } from './TestimonialSlide';

export function TestimonialsSection() {
  const { testimonials } = useSiteContent();
  const slides = testimonials.slides;
  const total = slides.length;

  const [current, setCurrent] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setNoTransition(false);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setNoTransition(false);
    setCurrent(i => {
      const ni = i + 1;
      if (ni === total + 1) {
        if (jumpTimer.current) clearTimeout(jumpTimer.current);
        jumpTimer.current = setTimeout(() => {
          setNoTransition(true);
          setCurrent(1);
        }, 700);
      }
      return ni;
    });
  }, [total]);

  const prev = useCallback(() => {
    setNoTransition(false);
    setCurrent(i => {
      const ni = i - 1;
      if (ni === 0) {
        if (jumpTimer.current) clearTimeout(jumpTimer.current);
        jumpTimer.current = setTimeout(() => {
          setNoTransition(true);
          setCurrent(total);
        }, 700);
      }
      return ni;
    });
  }, [total]);

  const startAutoPlay = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4000);
  }, [next]);

  const stopAutoPlay = useCallback(() => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { stopAutoPlay(); if (jumpTimer.current) clearTimeout(jumpTimer.current); };
  }, [startAutoPlay, stopAutoPlay]);

  const handlePrev = () => { prev(); stopAutoPlay(); setTimeout(startAutoPlay, 300); };
  const handleNext = () => { next(); stopAutoPlay(); setTimeout(startAutoPlay, 300); };

  const realIndex = ((current - 1) % total + total) % total;

  const extended = [slides[total - 1], ...slides, slides[0]];

  return (
    <section className="py-24 px-10 border-t border-border max-md:py-10 max-md:px-4 max-sm:px-4">
      <div className="mb-16 max-sm:mb-10">
        <div className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase inline-block">
          &#10022; {testimonials.label}
        </div>
        <h2 className="font-heading font-black text-[clamp(36px,5vw,56px)] uppercase leading-[1.1] text-white mt-4">
          {testimonials.headingText}
          <span className="text-accent block">{testimonials.headingHighlight}</span>
        </h2>
      </div>

      <div className="relative w-full md:px-8 sm:px-2">
        <button
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-2/90 border border-border-bright text-white cursor-pointer flex items-center justify-center text-2xl z-10 select-none transition-all hover:bg-bg-3 hover:border-accent hover:text-accent hover:scale-105 active:scale-95 -left-6 max-sm:left-0 max-sm:w-[38px] max-sm:text-lg"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          &#10094;
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-2/90 border border-border-bright text-white cursor-pointer flex items-center justify-center text-2xl z-10 select-none transition-all hover:bg-bg-3 hover:border-accent hover:text-accent hover:scale-105 active:scale-95 -right-6 max-sm:right-0 max-sm:w-[38px] max-sm:text-lg"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          &#10095;
        </button>
        <div
          className="relative w-full overflow-hidden bg-bg-2 border border-border-bright flex items-center justify-center"
          onMouseEnter={() => { setIsPaused(true); stopAutoPlay(); }}
          onMouseLeave={() => { setIsPaused(false); startAutoPlay(); }}
          style={{ padding: 'clamp(40px, 5vw, 60px) clamp(30px, 4vw, 50px)', minHeight: 'clamp(260px, 30vw, 320px)' }}
        >
          {isPaused && (
            <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.1em] text-black/60 uppercase z-10">Paused</div>
          )}
          <div
            className="flex w-full"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: noTransition ? 'none' : 'transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          >
            {extended.map((slide, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 flex items-center justify-center"
              >
                <TestimonialSlide quote={slide.quote} attribution={slide.attribution} location={slide.location} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SliderIndicators count={total} activeIndex={realIndex} onSelect={i => { goTo(i + 1); stopAutoPlay(); setTimeout(startAutoPlay, 300); }} />
    </section>
  );
}
