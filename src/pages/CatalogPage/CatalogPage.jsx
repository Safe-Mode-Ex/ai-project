import { Container, Typography } from '@mui/material'
import { ProductGrid } from '../../components/ProductGrid/ProductGrid'
import products from '../../data/products'
import './CatalogPage.css'

export function CatalogPage({ onAddToCart }) {
  return (
    <main className="catalog-page">
      <Container maxWidth="xl" className="catalog-page__container">
        <Typography variant="h3" component="h1" className="catalog-page__title">
          Каталог товаров
        </Typography>
        <ProductGrid products={products} onAddToCart={onAddToCart} />
      </Container>
    </main>
  )
}
