import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useGallery } from './useGallery';

describe('useGallery', () => {
  describe('Initial State', () => {
    it('Начальное состояние currentIndex: Должен быть 0', () => {
      const { result } = renderHook(() => useGallery(5));
      expect(result.current.currentIndex).toBe(0);
    });

    it('Начальное состояние direction: Должно быть "next"', () => {
      const { result } = renderHook(() => useGallery(5));
      expect(result.current.direction).toBe('next');
    });
  });

  describe('Navigation', () => {
    it('next: Переходит к следующему слайду', () => {
      const { result } = renderHook(() => useGallery(5));

      act(() => {
        result.current.next();
      });

      expect(result.current.currentIndex).toBe(1);
      expect(result.current.direction).toBe('next');
    });

    it('next на последнем слайде: Переходит к первому слайду (циклический)', () => {
      const { result } = renderHook(() => useGallery(3));

      act(() => {
        result.current.goTo(2);
      });
      expect(result.current.currentIndex).toBe(2);

      act(() => {
        result.current.next();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('prev: Переходит к предыдущему слайду', () => {
      const { result } = renderHook(() => useGallery(5));

      act(() => {
        result.current.goTo(2);
      });

      act(() => {
        result.current.prev();
      });

      expect(result.current.currentIndex).toBe(1);
      expect(result.current.direction).toBe('prev');
    });

    it('prev на первом слайде: Переходит к последнему слайду (циклический)', () => {
      const { result } = renderHook(() => useGallery(3));

      act(() => {
        result.current.prev();
      });

      expect(result.current.currentIndex).toBe(2);
      expect(result.current.direction).toBe('prev');
    });

    it('goTo: Переходит к указанному индексу', () => {
      const { result } = renderHook(() => useGallery(5));

      act(() => {
        result.current.goTo(3);
      });

      expect(result.current.currentIndex).toBe(3);
    });
  });

  describe('Direction Logic', () => {
    it('goTo с увеличением индекса: Устанавливает направление "next"', () => {
      const { result } = renderHook(() => useGallery(5));

      act(() => {
        result.current.goTo(1);
      });

      expect(result.current.direction).toBe('next');
    });

    it('goTo с уменьшением индекса: Устанавливает направление "prev"', () => {
      const { result } = renderHook(() => useGallery(5));

      act(() => {
        result.current.goTo(3);
      });

      act(() => {
        result.current.goTo(1);
      });

      expect(result.current.direction).toBe('prev');
    });
  });

  describe('Edge Cases', () => {
    it('Галерея с одним изображением: next остаётся на том же индексе', () => {
      const { result } = renderHook(() => useGallery(1));

      act(() => {
        result.current.next();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('Галерея с одним изображением: prev остаётся на том же индексе', () => {
      const { result } = renderHook(() => useGallery(1));

      act(() => {
        result.current.prev();
      });

      expect(result.current.currentIndex).toBe(0);
    });

  });
});
