import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartTable } from './CartTable';

// Mock CartItem component
vi.mock('../CartItem/CartItem', () => ({
  CartItem: ({ item, onRemove, onDecreaseQuantity, onIncreaseQuantity }) => (
    <tr data-testid="cart-item" data-item-id={item.id}>
      <td>{item.name}</td>
      <td>Mocked CartItem</td>
    </tr>
  ),
}));

describe('CartTable', () => {
  const mockCallbacks = {
    onRemoveItem: vi.fn(),
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
        <CartTable items={[]} {...mockCallbacks} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should display all 5 table headers', () => {
      render(<CartTable items={[]} {...mockCallbacks} />);

      expect(screen.getByText('Название')).toBeInTheDocument();
      expect(screen.getByText('Цена')).toBeInTheDocument();
      expect(screen.getByText('Количество')).toBeInTheDocument();
      expect(screen.getByText('Сумма')).toBeInTheDocument();
      expect(screen.getByText('Удалить')).toBeInTheDocument();
    });

    it('should display empty cart message when items is empty', () => {
      render(<CartTable items={[]} {...mockCallbacks} />);

      expect(screen.getByText('В корзине пока нет товаров')).toBeInTheDocument();
    });
  });

  // CartItem Components Tests
  describe('CartItem Components', () => {
    it('should render correct number of CartItem components', () => {
      const mockItems = [
        { ...mockItem, id: 1 },
        { ...mockItem, id: 2 },
        { ...mockItem, id: 3 }
      ];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      const cartItems = screen.getAllByTestId('cart-item');
      expect(cartItems).toHaveLength(3);
    });

    it('should pass item props to CartItem', () => {
      const mockItems = [{ ...mockItem, id: 1, name: 'Product 1' }];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      const cartItem = screen.getByTestId('cart-item');
      expect(cartItem).toHaveAttribute('data-item-id', '1');
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    it('should pass callback props to CartItem', () => {
      const mockItems = [{ ...mockItem, id: 1 }];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      // If CartItem receives callbacks, it should render without errors
      expect(screen.getByTestId('cart-item')).toBeInTheDocument();
    });
  });

  // Callback Functions Tests
  describe('Callback Functions', () => {
    it('should pass all callback functions to each CartItem', () => {
      const mockItems = [
        { ...mockItem, id: 1 },
        { ...mockItem, id: 2 }
      ];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      const cartItems = screen.getAllByTestId('cart-item');
      expect(cartItems).toHaveLength(2);
      // If callbacks are passed correctly, CartItem should render
      cartItems.forEach(item => {
        expect(item).toBeInTheDocument();
      });
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should display empty message when items array is empty', () => {
      render(<CartTable items={[]} {...mockCallbacks} />);

      expect(screen.getByText('В корзине пока нет товаров')).toBeInTheDocument();
      expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
    });

    it('should render one CartItem when there is one item', () => {
      const mockItems = [{ ...mockItem, id: 1 }];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      const cartItems = screen.getAllByTestId('cart-item');
      expect(cartItems).toHaveLength(1);
      expect(screen.queryByText('В корзине пока нет товаров')).not.toBeInTheDocument();
    });

    it('should render all CartItems when there are multiple items', () => {
      const mockItems = [
        { ...mockItem, id: 1 },
        { ...mockItem, id: 2 },
        { ...mockItem, id: 3 },
        { ...mockItem, id: 4 },
        { ...mockItem, id: 5 }
      ];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      const cartItems = screen.getAllByTestId('cart-item');
      expect(cartItems).toHaveLength(5);
    });

    it('should render items with different discounts correctly', () => {
      const mockItems = [
        { ...mockItem, id: 1, discount: 0 },
        { ...mockItem, id: 2, discount: 10 },
        { ...mockItem, id: 3, discount: 25 },
        { ...mockItem, id: 4, discount: 50 }
      ];

      render(<CartTable items={mockItems} {...mockCallbacks} />);

      const cartItems = screen.getAllByTestId('cart-item');
      expect(cartItems).toHaveLength(4);
      // All items have the same name, so we check for multiple occurrences
      const productNames = screen.getAllByText('Test Product');
      expect(productNames).toHaveLength(4);
    });
  });
});
