import { Box, Typography, Button } from '@mui/material';
import { PriceBlock } from '../PriceBlock/PriceBlock';
import { QuantityControl } from '../QuantityControl/QuantityControl';

/**
 * Product information and purchase controls component
 * @param {Object} props
 * @param {Object} props.product - Product details
 * @param {number} props.quantity - Current quantity in cart
 * @param {Function} props.onAddToCart - Add to cart callback
 * @param {Function} props.onDecrease - Decrease quantity callback
 * @param {Function} props.onIncrease - Increase quantity callback
 */
export function ProductInfo({ product, quantity, onAddToCart, onDecrease, onIncrease }) {
  const isInCart = quantity > 0;

  return (
    <Box className="product-detail-page__info-section">
      <Typography variant="h3" className="product-detail-page__title">
        {product.name}
      </Typography>

      <PriceBlock product={product} />

      <Box className="product-detail-page__actions">
        {isInCart ? (
          <QuantityControl
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        ) : (
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onAddToCart}
            className="product-detail-page__add-btn"
          >
            Добавить в корзину
          </Button>
        )}
      </Box>
    </Box>
  );
}
