import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import productsDetail from '../../data/productsDetail';
import products from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { getUnitPrice } from '../../utils/price';
import './ProductDetailPage.css';

/**
 * Компонент страницы детальной информации о товаре
 * @param {Function} onAddToCart - Callback для добавления товара в корзину
 * @param {Array} cartItems - Товары в корзине
 * @param {Function} onDecreaseQuantity - Callback для уменьшения количества
 * @param {Function} onIncreaseQuantity - Callback для увеличения количества
 * @returns {JSX.Element} Компонент страницы детальной информации
 */
export function ProductDetailPage({ onAddToCart, cartItems, onDecreaseQuantity, onIncreaseQuantity }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');

  const product = useMemo(() => productsDetail.find((p) => p.id === Number(productId)), [productId]);

  const baseProduct = useMemo(() => products.find((p) => p.id === Number(productId)), [productId]);

  const relatedProducts = useMemo(() => {
    const otherProducts = products.filter((p) => p.id !== Number(productId));
    const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [productId]);

  const cartItem = useMemo(
    () => cartItems.find((item) => item.id === Number(productId)),
    [cartItems, productId]
  );

  const quantity = cartItem?.quantity ?? 0;

  const handlePrevImage = () => {
    setSlideDirection('prev');
    setCurrentImageIndex((prev) => (prev === 0 ? product.gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSlideDirection('next');
    setCurrentImageIndex((prev) => (prev === product.gallery.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    onAddToCart(baseProduct);
  };

  const handleDecrease = () => {
    onDecreaseQuantity(Number(productId));
  };

  const handleIncrease = () => {
    onIncreaseQuantity(Number(productId));
  };

  if (!product) {
    return (
      <Container maxWidth="xl" className="product-detail-page">
        <Typography variant="h4" className="product-detail-page__not-found">
          Товар не найден
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} className="product-detail-page__back-btn">
          Вернуться в каталог
        </Button>
      </Container>
    );
  }

  const unitPrice = getUnitPrice(product);
  const hasDiscount = (product.discount ?? 0) > 0;

  return (
    <main className="product-detail-page">
      <Container maxWidth="xl" className="product-detail-page__container">
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate('/')}
          className="product-detail-page__back"
        >
          Назад в каталог
        </Button>

        <Grid container spacing={4} className="product-detail-page__main">
          <Grid size={{ xs: 12, md: 6 }} className="product-detail-page__gallery-section">
            <Box className="product-detail-page__gallery">
              <Box className="product-detail-page__gallery-slider">
                <IconButton
                  className="product-detail-page__gallery-nav product-detail-page__gallery-nav--prev"
                  onClick={handlePrevImage}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <Box className="product-detail-page__gallery-slides">
                  {product.gallery.map((image, index) => (
                    <Box
                      key={image}
                      className={`product-detail-page__gallery-slide ${
                        index === currentImageIndex
                          ? 'product-detail-page__gallery-slide--active'
                          : index === (currentImageIndex - 1 + product.gallery.length) % product.gallery.length
                          ? 'product-detail-page__gallery-slide--prev'
                          : index === (currentImageIndex + 1) % product.gallery.length
                          ? 'product-detail-page__gallery-slide--next'
                          : ''
                      } ${slideDirection === 'next' ? 'slide-direction-next' : 'slide-direction-prev'}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - фото ${index + 1}`}
                        className="product-detail-page__gallery-image"
                      />
                    </Box>
                  ))}
                </Box>
                <IconButton
                  className="product-detail-page__gallery-nav product-detail-page__gallery-nav--next"
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
                <Box className="product-detail-page__gallery-dots">
                {product.gallery.map((image, index) => (
                  <button
                    key={`dot-${image}`}
                    className={`product-detail-page__gallery-dot ${
                      index === currentImageIndex ? 'product-detail-page__gallery-dot--active' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Box>
            </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} className="product-detail-page__info-section">
            <Typography variant="h3" className="product-detail-page__title">
              {product.name}
            </Typography>

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

            <Box className="product-detail-page__actions">
              {quantity > 0 ? (
                <Box className="product-detail-page__quantity-controls">
                  <IconButton
                    size="small"
                    onClick={handleDecrease}
                    className="product-detail-page__quantity-btn"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" className="product-detail-page__quantity-value">
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleIncrease}
                    className="product-detail-page__quantity-btn"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleAddToCart}
                  className="product-detail-page__add-btn"
                >
                  Добавить в корзину
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider className="product-detail-page__divider product-detail-page__divider--top" />

        <Box className="product-detail-page__description-section">
          <Typography variant="h5" className="product-detail-page__section-title">
            Описание
          </Typography>
          <Typography variant="body1" className="product-detail-page__description">
            {product.fullDescription}
          </Typography>
        </Box>

        <Divider className="product-detail-page__divider" />

        <Box className="product-detail-page__related-section">
          <Typography variant="h5" className="product-detail-page__section-title">
            С этим товаром, обычно, покупают
          </Typography>
          <Box className="product-detail-page__related-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={onAddToCart}
                quantity={cartItems.find((item) => item.id === relatedProduct.id)?.quantity ?? 0}
                onDecreaseQuantity={onDecreaseQuantity}
                onIncreaseQuantity={onIncreaseQuantity}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </main>
  );
}
