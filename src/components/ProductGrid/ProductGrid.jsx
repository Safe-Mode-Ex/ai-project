import ProductCard from '../ProductCard/ProductCard'
import './ProductGrid.css'

function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="product-grid-section">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
