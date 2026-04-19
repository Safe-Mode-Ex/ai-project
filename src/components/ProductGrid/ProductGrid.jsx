import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

export function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}
