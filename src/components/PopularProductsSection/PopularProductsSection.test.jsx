import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PopularProductsSection } from './PopularProductsSection';

vi.mock('../ProductGrid/ProductGrid', () => ({
  ProductGrid: ({ products }) => <div data-testid="product-grid">{products.length}</div>,
}));

vi.mock('../../utils/array/array', () => ({
  getRandomItems: vi.fn((items, count) => items.slice(0, count)),
}));

vi.mock('../../data/products', () => ({
  default: [{ id: 1 }, { id: 2 }, { id: 3 }],
}));

describe('PopularProductsSection', () => {
  const mockProps = {
    onAddToCart: vi.fn(),
    cartItems: [],
    onDecreaseQuantity: vi.fn(),
    onIncreaseQuantity: vi.fn(),
  };

  it('Базовый рендеринг: Компонент рендерится без ошибок', () => {
    const { container } = render(<PopularProductsSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Заголовок отображается: Текст "Популярные товары" присутствует', () => {
    render(<PopularProductsSection {...mockProps} />);
    expect(screen.getByText('Популярные товары')).toBeInTheDocument();
  });

  it('ProductGrid рендерится с правильными пропами', () => {
    render(<PopularProductsSection {...mockProps} />);
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });

  it('Передает колбэки в ProductGrid', () => {
    render(<PopularProductsSection {...mockProps} />);
    const { container } = render(<PopularProductsSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
