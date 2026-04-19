import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useLimitNotification } from './useLimitNotification';

describe('useLimitNotification', () => {
  describe('Initial State', () => {
    it('Начальное состояние isLimitNotificationOpen: Должен быть false', () => {
      const { result } = renderHook(() => useLimitNotification(5));
      expect(result.current.isLimitNotificationOpen).toBe(false);
    });

    it('Начальное состояние limitNotificationMessage: Должна быть пустая строка', () => {
      const { result } = renderHook(() => useLimitNotification(5));
      expect(result.current.limitNotificationMessage).toBe('');
    });
  });

  describe('showLimitNotification', () => {
    it('showLimitNotification открывает уведомление: isLimitNotificationOpen становится true', () => {
      const { result } = renderHook(() => useLimitNotification(5));
      
      act(() => {
        result.current.showLimitNotification('Товар');
      });
      
      expect(result.current.isLimitNotificationOpen).toBe(true);
    });

    it('showLimitNotification устанавливает сообщение: limitNotificationMessage корректно формируется', () => {
      const { result } = renderHook(() => useLimitNotification(5));
      
      act(() => {
        result.current.showLimitNotification('Товар');
      });
      
      expect(result.current.limitNotificationMessage).toBe('Можно добавить не более 5 шт. товара "Товар".');
    });

    it('Сообщение содержит productName и maxProductQuantity: Проверка интеграции с getLimitMessage', () => {
      const { result } = renderHook(() => useLimitNotification(10));
      
      act(() => {
        result.current.showLimitNotification('Наушники');
      });
      
      expect(result.current.limitNotificationMessage).toContain('10');
      expect(result.current.limitNotificationMessage).toContain('Наушники');
    });
  });

  describe('handleCloseLimitNotification', () => {
    it('handleCloseLimitNotification закрывает уведомление: isLimitNotificationOpen становится false', () => {
      const { result } = renderHook(() => useLimitNotification(5));
      
      act(() => {
        result.current.showLimitNotification('Товар');
      });
      expect(result.current.isLimitNotificationOpen).toBe(true);
      
      act(() => {
        result.current.handleCloseLimitNotification();
      });
      
      expect(result.current.isLimitNotificationOpen).toBe(false);
    });
  });

  describe('Multiple Calls', () => {
    it('Многократный вызов showLimitNotification: Состояние обновляется корректно', () => {
      const { result } = renderHook(() => useLimitNotification(5));
      
      act(() => {
        result.current.showLimitNotification('Товар 1');
      });
      expect(result.current.limitNotificationMessage).toBe('Можно добавить не более 5 шт. товара "Товар 1".');
      
      act(() => {
        result.current.showLimitNotification('Товар 2');
      });
      expect(result.current.limitNotificationMessage).toBe('Можно добавить не более 5 шт. товара "Товар 2".');
    });
  });

  describe('Dependency Update', () => {
    it('Обновление maxProductQuantity: Новое значение используется', () => {
      const { result, rerender } = renderHook(
        ({ max }) => useLimitNotification(max),
        { initialProps: { max: 5 } }
      );
      
      act(() => {
        result.current.showLimitNotification('Товар');
      });
      expect(result.current.limitNotificationMessage).toContain('5');
      
      rerender({ max: 10 });
      
      act(() => {
        result.current.showLimitNotification('Товар');
      });
      expect(result.current.limitNotificationMessage).toContain('10');
    });
  });
});
