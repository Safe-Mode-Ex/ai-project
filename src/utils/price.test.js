import { describe, it, expect } from 'vitest';
import { getUnitPrice } from './price';

describe('getUnitPrice', () => {
  it('Без скидки: Возвращает исходную цену', () => {
    expect(getUnitPrice({ price: 100 })).toBe(100);
  });

  it('Скидка 0: Возвращает исходную цену', () => {
    expect(getUnitPrice({ price: 100, discount: 0 })).toBe(100);
  });

  it('Положительная скидка: Рассчитывает цену с учётом скидки', () => {
    expect(getUnitPrice({ price: 100, discount: 10 })).toBe(90);
  });

  it('Отрицательная скидка: Возвращает исходную цену', () => {
    expect(getUnitPrice({ price: 100, discount: -5 })).toBe(100);
  });

  it('Округление до целого: Корректно округляет результат', () => {
    expect(getUnitPrice({ price: 99, discount: 33 })).toBe(66);
  });
});
