import { describe, it, expect } from 'vitest';
import { getCartCount, getLimitMessage } from './cart.js';

describe('getCartCount', () => {
  it('Пустой массив: Возвращает 0', () => {
    expect(getCartCount([])).toBe(0);
  });

  it('Несколько товаров: Суммирует количества всех товаров', () => {
    const items = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 5 }
    ];
    expect(getCartCount(items)).toBe(10);
  });
});

describe('getLimitMessage', () => {
  it('Базовый функционал: Формирует корректное сообщение', () => {
    expect(getLimitMessage('Товар', 5)).toBe('Можно добавить не более 5 шт. товара "Товар".');
  });

  it('Максимальное количество 1: Корректно работает с единственным товаром', () => {
    expect(getLimitMessage('Ноутбук', 1)).toBe('Можно добавить не более 1 шт. товара "Ноутбук".');
  });

  it('Название товара с пробелами: Корректно обрабатывает названия с пробелами', () => {
    expect(getLimitMessage('iPhone 15 Pro', 2)).toBe('Можно добавить не более 2 шт. товара "iPhone 15 Pro".');
  });

  it('Название товара с кавычками: Корректно обрабатывает названия с кавычками', () => {
    expect(getLimitMessage('Товар "Специальный"', 5)).toBe('Можно добавить не более 5 шт. товара "Товар "Специальный"".');
  });
});
