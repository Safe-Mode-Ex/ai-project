import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartItem } from './CartItem';

describe('CartItem', () => {
  const mockCallbacks = {
    onRemove: vi.fn(),
    onDecreaseQuantity: vi.fn(),
    onIncreaseQuantity: vi.fn()
  };

  const mockItem = {
    id: 1,
    name: 'Test Product',
    price: 1000,
    quantity: 2,
    image: '/test-image.jpg'
  };

  // Basic Rendering Tests
  describe('Rendering', () => {
    it('should render with basic props', () => {
      const { container } = render(
        <CartItem item={mockItem} {...mockCallbacks} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render product image with correct src and alt', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const image = screen.getByAltText('Test Product');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('should render product name', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('should render quantity', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  // Price Display Tests
  describe('Price Display', () => {
    it('should display price without discount when discount is 0', () => {
      const itemWithoutDiscount = { ...mockItem, discount: 0 };

      render(<CartItem item={itemWithoutDiscount} {...mockCallbacks} />);

      expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
      expect(screen.queryByTestId('old-price')).not.toBeInTheDocument();
      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });

    it('should display price without discount when discount is undefined', () => {
      const itemWithoutDiscount = { ...mockItem };

      render(<CartItem item={itemWithoutDiscount} {...mockCallbacks} />);

      expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
    });

    it('should display old price, new price and discount percentage when discount > 0', () => {
      const itemWithDiscount = { ...mockItem, discount: 10 };

      render(<CartItem item={itemWithDiscount} {...mockCallbacks} />);

      expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
      expect(screen.getByText('900 ₽')).toBeInTheDocument();
      expect(screen.getByText('-10%')).toBeInTheDocument();
    });

    it('should calculate unitPrice correctly with discount', () => {
      const itemWithDiscount = { ...mockItem, discount: 20 };

      render(<CartItem item={itemWithDiscount} {...mockCallbacks} />);

      // 1000 * (1 - 0.2) = 800
      expect(screen.getByText('800 ₽')).toBeInTheDocument();
    });

    it('should calculate linePrice correctly (unitPrice * quantity)', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      // 1000 * 2 = 2000
      expect(screen.getByText('2 000 ₽')).toBeInTheDocument();
    });

    it('should calculate linePrice correctly with discount', () => {
      const itemWithDiscount = { ...mockItem, discount: 25 };

      render(<CartItem item={itemWithDiscount} {...mockCallbacks} />);

      // unitPrice: 1000 * 0.75 = 750
      // linePrice: 750 * 2 = 1500
      expect(screen.getByText('1 500 ₽')).toBeInTheDocument();
    });
  });

  // Callback Functions Tests
  describe('Callback Functions', () => {
    it('should call onRemove with item.id when delete button is clicked', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const deleteButton = screen.getByLabelText(/Удалить Test Product/);
      deleteButton.click();

      expect(mockCallbacks.onRemove).toHaveBeenCalledTimes(1);
      expect(mockCallbacks.onRemove).toHaveBeenCalledWith(1);
    });

    it('should call onDecreaseQuantity with item.id when decrease button is clicked', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const decreaseButton = screen.getByLabelText(/Уменьшить количество Test Product/);
      decreaseButton.click();

      expect(mockCallbacks.onDecreaseQuantity).toHaveBeenCalledTimes(1);
      expect(mockCallbacks.onDecreaseQuantity).toHaveBeenCalledWith(1);
    });

    it('should call onIncreaseQuantity with item.id when increase button is clicked', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const increaseButton = screen.getByLabelText(/Увеличить количество Test Product/);
      increaseButton.click();

      expect(mockCallbacks.onIncreaseQuantity).toHaveBeenCalledTimes(1);
      expect(mockCallbacks.onIncreaseQuantity).toHaveBeenCalledWith(1);
    });

    it('should have correct aria-label on delete button', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const deleteButton = screen.getByLabelText(/Удалить Test Product/);
      expect(deleteButton).toBeInTheDocument();
    });

    it('should have correct aria-label on decrease button', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const decreaseButton = screen.getByLabelText(/Уменьшить количество Test Product/);
      expect(decreaseButton).toBeInTheDocument();
    });

    it('should have correct aria-label on increase button', () => {
      render(<CartItem item={mockItem} {...mockCallbacks} />);

      const increaseButton = screen.getByLabelText(/Увеличить количество Test Product/);
      expect(increaseButton).toBeInTheDocument();
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should not display discount when discount is 0', () => {
      const itemWithZeroDiscount = { ...mockItem, discount: 0 };

      render(<CartItem item={itemWithZeroDiscount} {...mockCallbacks} />);

      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
      expect(screen.queryByText(/1 000 ₽/)).toBeInTheDocument();
    });

    it('should handle undefined discount as 0', () => {
      const itemWithoutDiscount = { ...mockItem, discount: undefined };

      render(<CartItem item={itemWithoutDiscount} {...mockCallbacks} />);

      expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });

    it('should not display discount when discount is negative', () => {
      const itemWithNegativeDiscount = { ...mockItem, discount: -10 };

      render(<CartItem item={itemWithNegativeDiscount} {...mockCallbacks} />);

      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
      expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
    });

    it('should handle discount > 100 (invalid data)', () => {
      const itemWithInvalidDiscount = { ...mockItem, discount: 150 };

      render(<CartItem item={itemWithInvalidDiscount} {...mockCallbacks} />);

      // getUnitPrice will calculate: 1000 * (1 - 150/100) = -500
      // This exposes a potential bug in the utility function
      expect(screen.getByText('-500 ₽')).toBeInTheDocument();
      expect(screen.getByText('-150%')).toBeInTheDocument();
    });

    it('should handle fractional prices with Math.round()', () => {
      const itemWithFractionalPrice = {
        ...mockItem,
        price: 99.99,
        discount: 10,
        quantity: 1
      };

      const { container } = render(<CartItem item={itemWithFractionalPrice} {...mockCallbacks} />);

      // 99.99 * 0.9 = 89.991 → 90 (rounded)
      const priceWrap = container.querySelector('.cart-item__price-wrap');
      expect(priceWrap).toHaveTextContent('90 ₽');
    });

    it('should handle 100% discount (free item)', () => {
      const itemWithFreeDiscount = {
        ...mockItem,
        discount: 100,
        quantity: 1
      };

      const { container } = render(<CartItem item={itemWithFreeDiscount} {...mockCallbacks} />);

      // 1000 * 0 = 0
      const priceWrap = container.querySelector('.cart-item__price-wrap');
      expect(priceWrap).toHaveTextContent('0 ₽');
      expect(screen.getByText('-100%')).toBeInTheDocument();
    });
  });

  // Memoization Tests
  describe('Memoization', () => {
    it('should re-render when item props change', () => {
      const { rerender } = render(
        <CartItem item={mockItem} {...mockCallbacks} />
      );

      expect(screen.getByText('2 000 ₽')).toBeInTheDocument();

      const updatedItem = { ...mockItem, quantity: 3 };
      rerender(<CartItem item={updatedItem} {...mockCallbacks} />);

      expect(screen.getByText('3 000 ₽')).toBeInTheDocument();
    });

    it('should re-render when callbacks change', () => {
      const { rerender } = render(
        <CartItem item={mockItem} {...mockCallbacks} />
      );

      const newCallbacks = {
        onRemove: vi.fn(),
        onDecreaseQuantity: vi.fn(),
        onIncreaseQuantity: vi.fn()
      };

      rerender(<CartItem item={mockItem} {...newCallbacks} />);

      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('should not crash when re-rendered with same props', () => {
      const { rerender } = render(
        <CartItem item={mockItem} {...mockCallbacks} />
      );

      rerender(<CartItem item={mockItem} {...mockCallbacks} />);

      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('2 000 ₽')).toBeInTheDocument();
    });
  });
});
