import { Box, Typography } from '@mui/material';
import { RelatedProductCard } from '../RelatedProductCard/RelatedProductCard';

/**
 * Related products section component
 * @param {Object} props
 * @param {Array} props.products - Related products array
 * @param {Array} props.cartItems - Current cart items
 * @param {Function} props.onAddToCart - Add to cart callback
 * @param {Function} props.onDecreaseQuantity - Decrease quantity callback
 * @param {Function} props.onIncreaseQuantity - Increase quantity callback
 */
export function RelatedProducts({
  products,
  cartItems,
  onAddToCart,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) {
  return (
    <Box className="product-detail-page__related-section">
      <Typography variant="h5" className="product-detail-page__section-title">
        С этим товаром, обычно, покупают
      </Typography>
      <Box className="product-detail-page__related-grid">
        {products.map((relatedProduct) => (
          <RelatedProductCard
            key={relatedProduct.id}
            product={relatedProduct}
            cartItems={cartItems}
            onAddToCart={onAddToCart}
            onDecreaseQuantity={onDecreaseQuantity}
            onIncreaseQuantity={onIncreaseQuantity}
          />
        ))}
      </Box>
    </Box>
  );
}
