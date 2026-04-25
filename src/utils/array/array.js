/**
 * Получает случайные элементы из массива
 * @template T
 * @param {T[]} items - Массив элементов
 * @param {number} count - Количество элементов для выборки
 * @returns {T[]} Массив случайных элементов указанного размера
 */
export function getRandomItems(items, count) {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
