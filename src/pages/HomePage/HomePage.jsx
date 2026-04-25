import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { IntroSection } from '../../components/IntroSection/IntroSection';
import { PopularProductsSection } from '../../components/PopularProductsSection/PopularProductsSection';
import { LocationSection } from '../../components/LocationSection/LocationSection';

/**
 * @typedef {Object} HomePageProps
 * @property {(product: Object) => void} onAddToCart - Callback для добавления товара в корзину
 * @property {Array} cartItems - Товары в корзине
 * @property {(productId: number) => void} onDecreaseQuantity - Callback для уменьшения количества
 * @property {(productId: number) => void} onIncreaseQuantity - Callback для увеличения количества
 */

/**
 * Компонент главной страницы
 * Содержит слайдер баннеров, раздел популярных товаров и раздел "Как нас найти" с картой
 * @param {HomePageProps} props
 * @returns {JSX.Element}
 */
export function HomePage({ onAddToCart, cartItems, onDecreaseQuantity, onIncreaseQuantity }) {
  return (
    <>
      <BannerSlider />
      <IntroSection />
      <PopularProductsSection
        onAddToCart={onAddToCart}
        cartItems={cartItems}
        onDecreaseQuantity={onDecreaseQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
      />
      <LocationSection />
    </>
  );
}
