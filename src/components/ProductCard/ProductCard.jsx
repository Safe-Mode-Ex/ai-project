import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
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
        <Typography variant="h6" color="primary" className="product-card__price">
          {product.price.toLocaleString('ru-RU')} ₽
        </Typography>
      </CardContent>
      <CardActions className="product-card__actions">
        <Button variant="contained" fullWidth onClick={() => onAddToCart(product)}>
          Добавить в корзину
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
