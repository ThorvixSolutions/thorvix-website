import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCarouselOptions {
  totalItems: number;
  autoPlayDelay?: number;
  initialIndex?: number;
}

export function useCarousel({ totalItems, autoPlayDelay, initialIndex = 0 }: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTransitioning = useRef(false);

  const next = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex(i => (i + 1) % totalItems);
    setTimeout(() => { isTransitioning.current = false; }, 650);
  }, [totalItems]);

  const prev = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex(i => (i - 1 + totalItems) % totalItems);
    setTimeout(() => { isTransitioning.current = false; }, 650);
  }, [totalItems]);

  const goTo = useCallback((index: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex(index);
    setTimeout(() => { isTransitioning.current = false; }, 650);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoPlayDelay) {
      intervalRef.current = setInterval(next, autoPlayDelay);
    }
  }, [autoPlayDelay, next]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetAutoPlay = useCallback(() => {
    stopAutoPlay();
    setTimeout(startAutoPlay, 300);
  }, [stopAutoPlay, startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  return { currentIndex, next, prev, goTo, startAutoPlay, stopAutoPlay, resetAutoPlay };
}
