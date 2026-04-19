import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { getUnitPrice } from '../../utils/price';
import './ProductCard.css';

export function ProductCard({ product, onAddToCart }) {
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
