import { Box, Typography } from '@mui/material';
import { getUnitPrice } from '../../utils/price';

/**
 * Price display component with discount badge
 * @param {Object} props
 * @param {{ price: number, discount?: number }} props.product - Product with price info
 */
export function PriceBlock({ product }) {
  const unitPrice = getUnitPrice(product);
  const hasDiscount = (product.discount ?? 0) > 0;

  return (
    <Box className="product-detail-page__price-block">
      {hasDiscount && (
        <Typography variant="h5" className="product-detail-page__price-old">
          {product.price.toLocaleString('ru-RU')} ₽
        </Typography>
      )}
      <Typography variant="h4" className="product-detail-page__price">
        {unitPrice.toLocaleString('ru-RU')} ₽
      </Typography>
      {hasDiscount && (
        <Typography variant="body2" className="product-detail-page__discount">
          -{product.discount}%
        </Typography>
      )}
    </Box>
  );
}
