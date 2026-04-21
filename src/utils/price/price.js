/**
 * Вычисляет цену за единицу товара с учётом скидки.
 *
 * @param {{ price: number, discount?: number }} product - Объект товара
 * @param {number} product.price - Базовая цена товара в рублях
 * @param {number} [product.discount=0] - Размер скидки в процентах (опционально)
 * @returns {number} Цена за единицу с учётом скидки, округлённая до целого числа
 */
export function getUnitPrice(product) {
  const discount = product.discount ?? 0;
  if (discount <= 0) {
    return product.price;
  }
  return Math.round(product.price * (1 - discount / 100));
}
