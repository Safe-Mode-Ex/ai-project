import { Box, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

/**
 * Quantity control buttons component
 * @param {Object} props
 * @param {number} props.quantity - Current quantity
 * @param {Function} props.onDecrease - Decrease quantity callback
 * @param {Function} props.onIncrease - Increase quantity callback
 */
export function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <Box className="product-detail-page__quantity-controls">
      <IconButton
        size="small"
        onClick={onDecrease}
        className="product-detail-page__quantity-btn"
        aria-label="Уменьшить количество"
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1" className="product-detail-page__quantity-value">
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrease}
        className="product-detail-page__quantity-btn"
        aria-label="Увеличить количество"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
