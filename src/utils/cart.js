/**
 * Вычисляет общее количество товаров в корзине.
 * @param {Array} items - Массив товаров в корзине, каждый с свойством quantity.
 * @returns {number} Общее количество всех товаров в корзине.
 */
export const getCartCount = (items) => items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

/**
 * Генерирует сообщение о лимите для товара.
 * @param {string} productName - Название товара.
 * @param {number} maxProductQuantity - Максимальное разрешённое количество товара.
 * @returns {string} Сообщение о лимите.
 */
export const getLimitMessage = (productName, maxProductQuantity) =>
  `Можно добавить не более ${maxProductQuantity} шт. товара "${productName}".`;
