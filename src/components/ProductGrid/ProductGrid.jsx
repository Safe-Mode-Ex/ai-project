import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

/**
 * @typedef {Object} Product
 * @property {number} id - Уникальный идентификатор товара
 * @property {string} name - Название товара
 * @property {string} description - Описание товара
 * @property {number} price - Базовая цена товара в рублях
 * @property {number} [discount] - Размер скидки в процентах (опционально)
 * @property {string} image - URL изображения товара
 */

/**
 * @typedef {Object} CartItem
 * @property {number} id - ID товара
 * @property {number} quantity - Количество в корзине
 */

/**
 * @typedef {Object} ProductGridProps
 * @property {Product[]} products - Массив товаров для отображения
 * @property {(product: Product) => void} onAddToCart - Callback для добавления товара в корзину
 * @property {CartItem[]} [cartItems] - Товары в корзине с количеством
 * @property {(productId: number) => void} [onDecreaseQuantity] - Callback для уменьшения количества
 * @property {(productId: number) => void} [onIncreaseQuantity] - Callback для увеличения количества
 */

/**
 * Компонент сетки товаров для отображения каталога.
 * Рендерит карточки товаров в виде CSS Grid.
 *
 * @param {ProductGridProps} props
 * @returns {JSX.Element}
 */
export function ProductGrid({ products, onAddToCart, cartItems = [], onDecreaseQuantity, onIncreaseQuantity }) {
  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section className="product-grid">
      {(products || []).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          quantity={getProductQuantity(product.id)}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity}
        />
      ))}
    </section>
  );
}
