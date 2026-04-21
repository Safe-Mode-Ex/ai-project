import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from './ProductDetailPage';

vi.mock('../../hooks/useProductDetail/useProductDetail', () => ({
  useProductDetail: (productId) => {
    if (productId === '999') {
      return {
        product: null,
        baseProduct: null,
        relatedProducts: [],
        isNotFound: true,
      };
    }
    return {
      product: {
        id: 1,
        name: 'Test Product',
        price: 1000,
        discount: 10,
        fullDescription: 'Full description',
        gallery: ['img1.jpg', 'img2.jpg'],
      },
      baseProduct: {
        id: 1,
        name: 'Test Product',
        price: 1000,
      },
      relatedProducts: [
        { id: 2, name: 'Related 1', price: 500 },
        { id: 3, name: 'Related 2', price: 600 },
      ],
      isNotFound: false,
    };
  },
}));

vi.mock('../../hooks/useCartItem/useCartItem', () => ({
  useCartItem: (cartItems, productId) => {
    const item = cartItems.find((i) => String(i.id) === String(productId));
    return { item, quantity: item?.quantity ?? 0 };
  },
}));

describe('ProductDetailPage', () => {
  const mockOnAddToCart = vi.fn();
  const mockOnDecrease = vi.fn();
  const mockOnIncrease = vi.fn();

  const defaultProps = {
    onAddToCart: mockOnAddToCart,
    cartItems: [],
    onDecreaseQuantity: mockOnDecrease,
    onIncreaseQuantity: mockOnIncrease,
  };

  const renderComponent = (productId = '1', props = {}) =>
    render(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route
            path="/product/:productId"
            element={<ProductDetailPage {...defaultProps} {...props} />}
          />
        </Routes>
      </MemoryRouter>
    );

  it('Рендер существующего товара: Отображает название товара', () => {
    renderComponent('1');

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('Рендер существующего товара: Отображает описание', () => {
    renderComponent('1');

    expect(screen.getByText('Full description')).toBeInTheDocument();
  });

  it('Рендер существующего товара: Отображает кнопку "Назад в каталог"', () => {
    renderComponent('1');

    expect(screen.getByText('Назад в каталог')).toBeInTheDocument();
  });

  it('Рендер существующего товара: Отображает секцию связанных товаров', () => {
    renderComponent('1');

    expect(screen.getByText('С этим товаром, обычно, покупают')).toBeInTheDocument();
  });

  it('Товар не найден: Отображает NotFoundState', () => {
    renderComponent('999');

    expect(screen.getByText('Товар не найден')).toBeInTheDocument();
    expect(screen.getByText('Вернуться в каталог')).toBeInTheDocument();
  });

  it('Товар в корзине: Отображает контрол количества', () => {
    const cartItems = [{ id: 1, name: 'Test Product', quantity: 2, price: 1000 }];
    renderComponent('1', { ...defaultProps, cartItems });

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
