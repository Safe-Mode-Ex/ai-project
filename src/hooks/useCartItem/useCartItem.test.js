import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCartItem } from './useCartItem';

describe('useCartItem', () => {
  const mockCartItems = [
    { id: 1, name: 'Товар 1', quantity: 2, price: 100 },
    { id: 2, name: 'Товар 2', quantity: 1, price: 200 },
    { id: 3, name: 'Товар 3', quantity: 5, price: 300 },
  ];

  describe('Finding Items', () => {
    it('Товар в корзине: Возвращает item и quantity', () => {
      const { result } = renderHook(() => useCartItem(mockCartItems, 1));

      expect(result.current.item).toEqual(mockCartItems[0]);
      expect(result.current.quantity).toBe(2);
    });

    it('Товара нет в корзине: Возвращает undefined и quantity 0', () => {
      const { result } = renderHook(() => useCartItem(mockCartItems, 999));

      expect(result.current.item).toBeUndefined();
      expect(result.current.quantity).toBe(0);
    });

    it('Пустая корзина: Возвращает undefined и quantity 0', () => {
      const { result } = renderHook(() => useCartItem([], 1));

      expect(result.current.item).toBeUndefined();
      expect(result.current.quantity).toBe(0);
    });
  });

  describe('ID Type Handling', () => {
    it('String ID: Корректно обрабатывает строковый ID', () => {
      const { result } = renderHook(() => useCartItem(mockCartItems, '2'));

      expect(result.current.item).toEqual(mockCartItems[1]);
      expect(result.current.quantity).toBe(1);
    });

    it('Number ID: Корректно обрабатывает числовой ID', () => {
      const { result } = renderHook(() => useCartItem(mockCartItems, 2));

      expect(result.current.item).toEqual(mockCartItems[1]);
      expect(result.current.quantity).toBe(1);
    });
  });

  describe('Reactivity', () => {
    it('Обновление cartItems: Пересчитывает результат при изменении корзины', () => {
      const { result, rerender } = renderHook(
        ({ items, id }) => useCartItem(items, id),
        { initialProps: { items: mockCartItems, id: 1 } }
      );

      expect(result.current.quantity).toBe(2);

      const updatedItems = [...mockCartItems];
      updatedItems[0] = { ...updatedItems[0], quantity: 10 };

      rerender({ items: updatedItems, id: 1 });

      expect(result.current.quantity).toBe(10);
    });

    it('Обновление productId: Находит новый товар при изменении ID', () => {
      const { result, rerender } = renderHook(
        ({ items, id }) => useCartItem(items, id),
        { initialProps: { items: mockCartItems, id: 1 } }
      );

      expect(result.current.quantity).toBe(2);

      rerender({ items: mockCartItems, id: 3 });

      expect(result.current.quantity).toBe(5);
    });
  });

  describe('Quantity Edge Cases', () => {
    it('Quantity 0: Корректно обрабатывает товар с quantity 0', () => {
      const itemsWithZero = [{ id: 1, name: 'Товар', quantity: 0, price: 100 }];
      const { result } = renderHook(() => useCartItem(itemsWithZero, 1));

      expect(result.current.quantity).toBe(0);
    });

    it('Quantity undefined: Обрабатывает undefined как 0', () => {
      const itemsWithUndefined = [{ id: 1, name: 'Товар', price: 100 }];
      const { result } = renderHook(() => useCartItem(itemsWithUndefined, 1));

      expect(result.current.quantity).toBe(0);
    });
  });
});
