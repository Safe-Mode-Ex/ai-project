import { Container, Typography, Box } from '@mui/material';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { Map } from '../../components/Map/Map';
import products from '../../data/products';
import './CatalogPage.css';

/**
 * Компонент страницы каталога - отображает каталог товаров со всеми доступными продуктами
 * @param {Function} onAddToCart - Callback для добавления товара в корзину
 * @returns {JSX.Element} Компонент страницы каталога
 */
export function CatalogPage({ onAddToCart }) {
  return (
    <>
      <main className="catalog-page">
        <Container maxWidth="xl" className="catalog-page__container">
          <Typography variant="h3" component="h1" className="catalog-page__title">
            Каталог товаров
          </Typography>
          <ProductGrid products={products} onAddToCart={onAddToCart} />
        </Container>
      </main>
      <Box className="location-section">
        <Container maxWidth="xl">
          <Typography variant="h4" component="h2" className="location-section__title">
            Как нас найти
          </Typography>
        </Container>
        <Map />
      </Box>
    </>
  );
}
