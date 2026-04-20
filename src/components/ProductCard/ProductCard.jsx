import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { getUnitPrice } from '../../utils/price';
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
 */

/**
 * Компонент карточки товара для каталога.
 * Отображает изображение, название, описание, цену (с учётом скидки) и кнопку добавления в корзину.
 *
 * @param {ProductCardProps} props
 * @returns {JSX.Element|null}
 */
export function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return null;
  }

  const hasDiscount = (product.discount ?? 0) > 0;
  const unitPrice = getUnitPrice(product);

  return (
    <Card className="product-card" elevation={3}>
      <CardMedia component="img" image={product.image} alt={product.name} className="product-card__image" />
      <CardContent className="product-card__content">
        <Typography variant="h6" component="h2" className="product-card__title">
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
        <Button variant="contained" fullWidth onClick={() => onAddToCart(product)}>
          Добавить в корзину
        </Button>
      </CardActions>
    </Card>
  );
}
