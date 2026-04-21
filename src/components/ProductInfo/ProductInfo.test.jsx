import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductInfo } from './ProductInfo';

describe('ProductInfo', () => {
  const mockProduct = {
    name: 'Test Product',
    price: 1000,
    discount: 10,
  };

  const defaultProps = {
    product: mockProduct,
    quantity: 0,
    onAddToCart: vi.fn(),
    onDecrease: vi.fn(),
    onIncrease: vi.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<ProductInfo {...defaultProps} {...props} />);

  it('Рендер: Отображает название товара', () => {
    renderComponent();

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('Quantity 0: Отображает кнопку "Добавить в корзину"', () => {
    renderComponent({ quantity: 0 });

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('Quantity > 0: Отображает контрол количества', () => {
    renderComponent({ quantity: 2 });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('Добавить в корзину')).not.toBeInTheDocument();
  });

  it('Click add to cart: Вызывает onAddToCart при клике', () => {
    const mockAdd = vi.fn();
    renderComponent({ onAddToCart: mockAdd, quantity: 0 });

    fireEvent.click(screen.getByText('Добавить в корзину'));

    expect(mockAdd).toHaveBeenCalledTimes(1);
  });

  it('Click decrease: Вызывает onDecrease при клике на минус', () => {
    const mockDecrease = vi.fn();
    renderComponent({ onDecrease: mockDecrease, quantity: 2 });

    fireEvent.click(screen.getByLabelText('Уменьшить количество'));

    expect(mockDecrease).toHaveBeenCalledTimes(1);
  });

  it('Click increase: Вызывает onIncrease при клике на плюс', () => {
    const mockIncrease = vi.fn();
    renderComponent({ onIncrease: mockIncrease, quantity: 2 });

    fireEvent.click(screen.getByLabelText('Увеличить количество'));

    expect(mockIncrease).toHaveBeenCalledTimes(1);
  });

  it('Quantity 1: Отображает контрол количества', () => {
    renderComponent({ quantity: 1 });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText('Уменьшить количество')).toBeInTheDocument();
    expect(screen.getByLabelText('Увеличить количество')).toBeInTheDocument();
  });
});
