import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RelatedProducts } from './RelatedProducts';

vi.mock('../RelatedProductCard/RelatedProductCard', () => ({
  RelatedProductCard: ({ product }) => (
    <div data-testid={`related-card-${product.id}`}>{product.name}</div>
  ),
}));

describe('RelatedProducts', () => {
  const mockProducts = [
    { id: 2, name: 'Product 2', price: 2000 },
    { id: 3, name: 'Product 3', price: 3000 },
    { id: 4, name: 'Product 4', price: 4000 },
  ];

  const defaultProps = {
    products: mockProducts,
    cartItems: [],
    onAddToCart: vi.fn(),
    onDecreaseQuantity: vi.fn(),
    onIncreaseQuantity: vi.fn(),
  };

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <RelatedProducts {...defaultProps} {...props} />
      </MemoryRouter>
    );

  it('Рендер: Отображает заголовок секции', () => {
    renderComponent();

    expect(screen.getByText('С этим товаром, обычно, покупают')).toBeInTheDocument();
  });

  it('Рендер: Отображает все связанные товары', () => {
    renderComponent();

    mockProducts.forEach((product) => {
      expect(screen.getByTestId(`related-card-${product.id}`)).toBeInTheDocument();
    });
  });

  it('Пустой список: Отображает заголовок без карточек', () => {
    renderComponent({ products: [] });

    expect(screen.getByText('С этим товаром, обычно, покупают')).toBeInTheDocument();
    expect(screen.queryByTestId(/related-card-/)).not.toBeInTheDocument();
  });

  it('Один товар: Отображает одну карточку', () => {
    renderComponent({ products: [mockProducts[0]] });

    expect(screen.getByTestId('related-card-2')).toBeInTheDocument();
  });
});
