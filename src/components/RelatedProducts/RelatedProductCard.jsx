import { useCartItem } from '../../hooks/useCartItem/useCartItem';
import { ProductCard } from '../ProductCard/ProductCard';

/**
 * Related product card wrapper with cart integration
 * @param {Object} props
 * @param {Object} props.product - Product data
 * @param {Array} props.cartItems - Current cart items
 * @param {Function} props.onAddToCart - Add to cart callback
 * @param {Function} props.onDecreaseQuantity - Decrease quantity callback
 * @param {Function} props.onIncreaseQuantity - Increase quantity callback
 */
export function RelatedProductCard({
  product,
  cartItems,
  onAddToCart,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) {
  const { quantity } = useCartItem(cartItems, product.id);

  return (
    <ProductCard
      product={product}
      onAddToCart={onAddToCart}
      quantity={quantity}
      onDecreaseQuantity={onDecreaseQuantity}
      onIncreaseQuantity={onIncreaseQuantity}
    />
  );
}
