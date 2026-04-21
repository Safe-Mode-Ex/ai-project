import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RelatedProductCard } from './RelatedProductCard';

vi.mock('../ProductCard/ProductCard', () => ({
  ProductCard: ({ product, quantity }) => (
    <div data-testid={`product-card-${product.id}`} data-quantity={quantity}>
      {product.name}
    </div>
  ),
}));

describe('RelatedProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 1000,
  };

  const defaultProps = {
    product: mockProduct,
    cartItems: [],
    onAddToCart: vi.fn(),
    onDecreaseQuantity: vi.fn(),
    onIncreaseQuantity: vi.fn(),
  };

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <RelatedProductCard {...defaultProps} {...props} />
      </MemoryRouter>
    );

  it('Рендер: Передает product в ProductCard', () => {
    renderComponent();

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('Товар не в корзине: Передает quantity 0', () => {
    renderComponent({ cartItems: [] });

    const card = screen.getByTestId('product-card-1');
    expect(card).toHaveAttribute('data-quantity', '0');
  });

  it('Товар в корзине: Передает корректный quantity', () => {
    const cartItems = [{ id: 1, name: 'Test Product', quantity: 3, price: 1000 }];
    renderComponent({ cartItems });

    const card = screen.getByTestId('product-card-1');
    expect(card).toHaveAttribute('data-quantity', '3');
  });

});
