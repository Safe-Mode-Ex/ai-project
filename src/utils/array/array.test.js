import { describe, it, expect } from 'vitest';
import { getRandomItems } from './array.js';

describe('getRandomItems', () => {
  it('Базовый функционал: Возвращает указанное количество элементов', () => {
    const items = [1, 2, 3, 4, 5];
    const result = getRandomItems(items, 3);
    expect(result).toHaveLength(3);
  });

  it('Пустой массив: Возвращает пустой массив', () => {
    expect(getRandomItems([], 3)).toEqual([]);
  });

  it('Количество больше длины массива: Возвращает все элементы', () => {
    const items = [1, 2, 3];
    const result = getRandomItems(items, 5);
    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it('Количество равно 0: Возвращает пустой массив', () => {
    const items = [1, 2, 3, 4, 5];
    expect(getRandomItems(items, 0)).toEqual([]);
  });

  it('Не изменяет исходный массив: Сохраняет оригинал', () => {
    const items = [1, 2, 3, 4, 5];
    const original = [...items];
    getRandomItems(items, 3);
    expect(items).toEqual(original);
  });

  it('Все возвращаемые элементы из исходного массива: Проверяет содержимое', () => {
    const items = [1, 2, 3, 4, 5];
    const result = getRandomItems(items, 3);
    result.forEach(item => {
      expect(items).toContain(item);
    });
  });
});
