import { useParams } from 'react-router-dom';
import { Container, Typography, Divider, Box, Grid } from '@mui/material';
import { useProductDetail } from '../../hooks/useProductDetail/useProductDetail';
import { useCartItem } from '../../hooks/useCartItem/useCartItem';
import { BackButton } from '../../components/BackButton/BackButton';
import { NotFoundState } from '../../components/NotFoundState/NotFoundState';
import { ProductGallery } from '../../components/ProductGallery/ProductGallery';
import { ProductInfo } from '../../components/ProductInfo/ProductInfo';
import { RelatedProducts } from '../../components/RelatedProducts/RelatedProducts';
import './ProductDetailPage.css';

/**
 * Компонент страницы детальной информации о товаре
 * @param {Object} props
 * @param {Function} props.onAddToCart - Callback для добавления товара в корзину
 * @param {Array} props.cartItems - Товары в корзине
 * @param {Function} props.onDecreaseQuantity - Callback для уменьшения количества
 * @param {Function} props.onIncreaseQuantity - Callback для увеличения количества
 * @returns {JSX.Element} Компонент страницы детальной информации
 */
export function ProductDetailPage({
  onAddToCart,
  cartItems,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) {
  const { productId } = useParams();
  const { product, baseProduct, relatedProducts, isNotFound } = useProductDetail(productId);
  const { quantity } = useCartItem(cartItems, productId);

  if (isNotFound) {
    return <NotFoundState />;
  }

  const handleAddToCart = () => onAddToCart(baseProduct);
  const handleDecrease = () => onDecreaseQuantity(Number(productId));
  const handleIncrease = () => onIncreaseQuantity(Number(productId));

  return (
    <main className="product-detail-page">
      <Container maxWidth="xl" className="product-detail-page__container">
        <BackButton />

        <Grid container spacing={4} className="product-detail-page__main">
          <Grid size={{ xs: 12, md: 6 }} className="product-detail-page__gallery-section">
            <ProductGallery images={product.gallery} name={product.name} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} className="product-detail-page__info-section">
            <ProductInfo
              product={product}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
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

        <RelatedProducts
          products={relatedProducts}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity}
        />
      </Container>
    </main>
  );
}
