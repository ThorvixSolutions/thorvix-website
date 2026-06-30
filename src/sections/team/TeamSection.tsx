import { useRef, useState, useEffect, useCallback } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SectionLabel } from '../../ui/SectionLabel';
import { SectionHeading } from '../../ui/SectionHeading';
import { TeamCard } from './TeamCard';

const CLONE_COUNT = 3;

export function TeamSection() {
  const { team } = useSiteContent();
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [stepSize, setStepSize] = useState(0);
  const isTransitioning = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const originalMembers = team.members;
  const originalCount = originalMembers.length;

  const allMembers = [
    ...originalMembers.slice(-CLONE_COUNT),
    ...originalMembers,
    ...originalMembers.slice(0, CLONE_COUNT),
  ];

  const totalAll = allMembers.length;

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.team-slide');
    if (cards.length >= 2) {
      const r0 = cards[0].getBoundingClientRect();
      const r1 = cards[1].getBoundingClientRect();
      setStepSize(r1.left - r0.left);
    } else if (cards.length === 1) {
      setStepSize(cards[0].getBoundingClientRect().width);
    }
  }, []);

  const getPosition = useCallback((index: number) => {
    if (isTablet) return index * stepSize;
    return (index - 1) * stepSize;
  }, [stepSize, isTablet]);

  const updatePosition = useCallback((smooth = true) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    track.style.transition = smooth
      ? 'transform 650ms cubic-bezier(0.32, 0.72, 0, 1)'
      : 'none';
    track.style.transform = `translateX(-${getPosition(currentIndex)}px)`;
  }, [currentIndex, getPosition]);

  const normalize = useCallback(() => {
    if (currentIndex >= originalCount + CLONE_COUNT) {
      const newIndex = currentIndex - originalCount;
      setCurrentIndex(newIndex);
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(-${getPosition(newIndex)}px)`;
        void trackRef.current.offsetWidth;
      }
    } else if (currentIndex < CLONE_COUNT) {
      const newIndex = currentIndex + originalCount;
      setCurrentIndex(newIndex);
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(-${getPosition(newIndex)}px)`;
        void trackRef.current.offsetWidth;
      }
    }
  }, [currentIndex, originalCount, getPosition]);

  const next = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex(i => i + 1);
    setTimeout(() => { isTransitioning.current = false; }, 700);
  }, []);

  const prev = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex(i => i - 1);
    setTimeout(() => { isTransitioning.current = false; }, 700);
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(next, 3200);
  }, [next]);

  const stopAutoScroll = useCallback(() => {
    if (autoTimerRef.current) { clearInterval(autoTimerRef.current); autoTimerRef.current = null; }
  }, []);

  const didMountRef = useRef(false);

  useEffect(() => {
    measure();
    updatePosition(false);
    startAutoScroll();
    return stopAutoScroll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    const onResize = () => {
      measure();
      updatePosition(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    }
    updatePosition(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if (stepSize > 0) updatePosition(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepSize]);

  useEffect(() => {
    const t = setTimeout(() => {
      normalize();
    }, 680);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const getActiveIndex = () => {
    return ((currentIndex - CLONE_COUNT) % originalCount + originalCount) % originalCount;
  };

  const realActiveIndex = getActiveIndex();

  return (
    <section id="team" className="py-24 px-10 border-t border-border max-md:py-8 max-sm:px-5">
      <div className="grid grid-cols-2 gap-10 items-end mb-16 max-md:grid-cols-1">
        <div>
          <SectionLabel>{team.label}</SectionLabel>
          <SectionHeading lines={team.headingLines} outlineIndex={team.outlineIndex} />
        </div>
        <p className="text-[15px] leading-[1.7] text-muted max-w-[420px] justify-self-end max-md:justify-self-start">
          {team.intro}
        </p>
      </div>

      <div className="relative mt-2">
        <button
          className="absolute top-1/2 -translate-y-1/2 w-11 h-11 border border-border bg-bg/[0.88] text-white grid place-items-center z-[3] left-0 transition-all hover:bg-bg-3 hover:border-accent active:scale-[0.96]"
          onClick={() => { prev(); stopAutoScroll(); startAutoScroll(); }}
          aria-label="Previous team member"
        >
          &#8249;
        </button>

        <div className="overflow-hidden px-14 py-2.5 max-sm:px-0 max-sm:py-2">
          <div
            ref={trackRef}
            className="flex gap-6 py-4 px-1.5 items-center will-change-transform"
          >
            {allMembers.map((member, i) => {
              const mappedIndex = ((i - CLONE_COUNT) % originalCount + originalCount) % originalCount;
              const isActive = mappedIndex === realActiveIndex;

              return (
                <div
                  key={i}
                  className="team-slide"
                  style={{
                    flex: isTablet ? '0 0 100%' : `0 0 calc((100% - 48px) / 3)`,
                  }}
                >
                  <TeamCard
                    num={member.num}
                    name={member.name}
                    role={member.role}
                    focus={member.focus}
                    imageUrl={member.imageUrl}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="absolute top-1/2 -translate-y-1/2 w-11 h-11 border border-border bg-bg/[0.88] text-white grid place-items-center z-[3] right-0 transition-all hover:bg-bg-3 hover:border-accent active:scale-[0.96]"
          onClick={() => { next(); stopAutoScroll(); startAutoScroll(); }}
          aria-label="Next team member"
        >
          &#8250;
        </button>
      </div>

      <div className="mt-12 text-center">
        <span
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent border-b border-transparent pb-0.5 transition-colors hover:border-accent cursor-pointer"
        >
          {team.ctaLabel}
        </span>
      </div>
    </section>
  );
}
