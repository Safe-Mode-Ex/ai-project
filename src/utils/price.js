/**
 * Цена за единицу с учётом скидки (руб., округление до целого).
 * @param {{ price: number, discount?: number }} product
 */
export function getUnitPrice(product) {
  const discount = product.discount ?? 0;
  if (discount <= 0) {
    return product.price;
  }
  return Math.round(product.price * (1 - discount / 100));
}
