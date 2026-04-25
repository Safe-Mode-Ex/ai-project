import { Container, Typography, Box } from '@mui/material';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import products from '../../data/products';
import { getRandomItems } from '../../utils/array/array';
import './PopularProductsSection.css';

/**
 * @typedef {Object} PopularProductsSectionProps
 * @property {(product: Object) => void} onAddToCart - Callback для добавления товара в корзину
 * @property {Array} cartItems - Товары в корзине
 * @property {(productId: number) => void} onDecreaseQuantity - Callback для уменьшения количества
 * @property {(productId: number) => void} onIncreaseQuantity - Callback для увеличения количества
 */

const POPULAR_PRODUCTS_COUNT = 8;

/**
 * Секция популярных товаров
 * @param {PopularProductsSectionProps} props
 * @returns {JSX.Element}
 */
export function PopularProductsSection({
  onAddToCart,
  cartItems,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) {
  const randomProducts = getRandomItems(products, POPULAR_PRODUCTS_COUNT);

  return (
    <Box className="popular-products-section">
      <Container maxWidth="xl" className="popular-products-section__container">
        <Typography variant="h4" component="h2" className="popular-products-section__title">
          Популярные товары
        </Typography>
        <ProductGrid
          products={randomProducts}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity}
        />
      </Container>
    </Box>
  );
}
