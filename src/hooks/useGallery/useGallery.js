import { useState, useCallback } from 'react';

/**
 * Hook for managing gallery slider state and navigation
 * @param {number} totalImages - Total number of images in gallery
 * @returns {{ currentIndex: number, direction: string, goTo: Function, next: Function, prev: Function }}
 */
export function useGallery(totalImages) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');

  const goTo = useCallback((index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  }, [currentIndex]);

  const next = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prevState) => (prevState === totalImages - 1 ? 0 : prevState + 1));
  }, [totalImages]);

  const prev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prevState) => (prevState === 0 ? totalImages - 1 : prevState - 1));
  }, [totalImages]);

  return {
    currentIndex,
    direction,
    goTo,
    next,
    prev,
  };
}
