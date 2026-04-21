import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useProductDetail } from './useProductDetail';

vi.mock('../../data/productsDetail', () => ({
  default: [
    {
      id: 1,
      name: 'Наушники',
      price: 5990,
      fullDescription: 'Описание наушников',
      gallery: ['img1.jpg', 'img2.jpg'],
    },
    {
      id: 2,
      name: 'Часы',
      price: 8990,
      fullDescription: 'Описание часов',
      gallery: ['img3.jpg'],
    },
  ],
}));

vi.mock('../../data/products', () => ({
  default: [
    { id: 1, name: 'Наушники', price: 5990, description: 'Краткое описание' },
    { id: 2, name: 'Часы', price: 8990, description: 'Краткое описание' },
    { id: 3, name: 'Колонка', price: 4290, description: 'Краткое описание' },
    { id: 4, name: 'Планшет', price: 29990, description: 'Краткое описание' },
    { id: 5, name: 'Клавиатура', price: 5990, description: 'Краткое описание' },
    { id: 6, name: 'Мышь', price: 2990, description: 'Краткое описание' },
  ],
}));

describe('useProductDetail', () => {
  let originalMathRandom;

  beforeEach(() => {
    originalMathRandom = Math.random;
    Math.random = vi.fn(() => 0.5);
  });

  afterEach(() => {
    Math.random = originalMathRandom;
  });

  describe('Product Finding', () => {
    it('Существующий товар: Возвращает product и baseProduct', () => {
      const { result } = renderHook(() => useProductDetail(1));

      expect(result.current.product).toBeDefined();
      expect(result.current.product.id).toBe(1);
      expect(result.current.product.name).toBe('Наушники');
      expect(result.current.baseProduct).toBeDefined();
      expect(result.current.baseProduct.id).toBe(1);
      expect(result.current.isNotFound).toBe(false);
    });

    it('Несуществующий товар: Возвращает undefined и isNotFound true', () => {
      const { result } = renderHook(() => useProductDetail(999));

      expect(result.current.product).toBeUndefined();
      expect(result.current.baseProduct).toBeUndefined();
      expect(result.current.isNotFound).toBe(true);
    });

    it('String ID: Корректно обрабатывает строковый ID', () => {
      const { result } = renderHook(() => useProductDetail('2'));

      expect(result.current.product?.id).toBe(2);
      expect(result.current.baseProduct?.id).toBe(2);
    });
  });

  describe('Related Products', () => {
    it('Возвращает 4 связанных товара', () => {
      const { result } = renderHook(() => useProductDetail(1));

      expect(result.current.relatedProducts).toHaveLength(4);
    });

    it('Связанные товары не содержат текущий товар', () => {
      const { result } = renderHook(() => useProductDetail(1));

      const relatedIds = result.current.relatedProducts.map((p) => p.id);
      expect(relatedIds).not.toContain(1);
    });

    it('При недостатке товаров: Возвращает все доступные другие товары', () => {
      const { result } = renderHook(() => useProductDetail(1));

      expect(result.current.relatedProducts.length).toBeGreaterThan(0);
      expect(result.current.relatedProducts.length).toBeLessThanOrEqual(4);
    });
  });

  describe('Memoization', () => {
    it('При том же ID: Возвращает те же объекты (memoization)', () => {
      const { result, rerender } = renderHook(
        ({ id }) => useProductDetail(id),
        { initialProps: { id: 1 } }
      );

      const firstProduct = result.current.product;
      const firstRelated = result.current.relatedProducts;

      rerender({ id: 1 });

      expect(result.current.product).toBe(firstProduct);
      expect(result.current.relatedProducts).toBe(firstRelated);
    });

    it('При изменении ID: Возвращает новые объекты', () => {
      const { result, rerender } = renderHook(
        ({ id }) => useProductDetail(id),
        { initialProps: { id: 1 } }
      );

      const firstProduct = result.current.product;

      rerender({ id: 2 });

      expect(result.current.product).not.toBe(firstProduct);
      expect(result.current.product?.id).toBe(2);
    });
  });
});
