import { Button, Card, CardActions, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getUnitPrice } from '../../utils/price/price.js';
import './ProductCard.css';

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
 * @typedef {Object} ProductCardProps
 * @property {Product} product - Объект товара для отображения
 * @property {(product: Product) => void} onAddToCart - Callback для добавления товара в корзину
 * @property {number} [quantity] - Текущее количество товара в корзине
 * @property {(productId: number) => void} onDecreaseQuantity - Callback для уменьшения количества
 * @property {(productId: number) => void} onIncreaseQuantity - Callback для увеличения количества
 */

/**
 * Компонент карточки товара для каталога.
 * Отображает изображение, название, описание, цену (с учётом скидки) и кнопку добавления в корзину.
 *
 * @param {ProductCardProps} props
 * @returns {JSX.Element|null}
 */
export function ProductCard({ product, onAddToCart, quantity = 0, onDecreaseQuantity, onIncreaseQuantity }) {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const hasDiscount = (product.discount ?? 0) > 0;
  const unitPrice = getUnitPrice(product);

  const handleImageClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleTitleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="product-card" elevation={3}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        className="product-card__image"
        onClick={handleImageClick}
      />
      <CardContent className="product-card__content">
        <Typography
          variant="h6"
          component="h2"
          className="product-card__title"
          onClick={handleTitleClick}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="product-card__description">
          {product.description}
        </Typography>
        <div className="product-card__prices">
          {hasDiscount && (
            <Typography variant="body1" color="text.secondary" className="product-card__price-old">
              {product.price.toLocaleString('ru-RU')} ₽
            </Typography>
          )}
          <Typography variant="h6" color="primary" className="product-card__price">
            {unitPrice.toLocaleString('ru-RU')} ₽
          </Typography>
        </div>
      </CardContent>
      <CardActions className="product-card__actions">
        {quantity > 0 ? (
          <Box className="product-card__quantity-controls">
            <IconButton
              size="small"
              onClick={() => onDecreaseQuantity(product.id)}
              className="product-card__quantity-btn"
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" className="product-card__quantity-value">
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onIncreaseQuantity(product.id)}
              className="product-card__quantity-btn"
            >
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => onAddToCart(product)}
          >
            Добавить в корзину
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
