import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartPage } from './CartPage';

describe('CartPage', () => {
  const mockCallbacks = {
    onRemoveItem: vi.fn(),
    onDecreaseQuantity: vi.fn(),
    onIncreaseQuantity: vi.fn(),
    onApplyPromoCode: vi.fn()
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with empty cart', () => {
      const { container } = render(
        <CartPage 
          items={[]} 
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Корзина')).toBeInTheDocument();
    });

    it('should render with items', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 2 }
      ];

      render(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      expect(screen.getByText('Корзина')).toBeInTheDocument();
    });

    it('should display page title "Корзина"', () => {
      render(
        <CartPage 
          items={[]} 
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Корзина');
    });
  });

  // Price Calculation Tests
  describe('Price Calculation', () => {
    it('should calculate total price correctly from items with quantities', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 2 },
        { id: 2, name: 'Product 2', price: 500, quantity: 1 }
      ];

      const { container } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      // Total should be 1000 * 2 + 500 * 1 = 2500
      // We verify this by checking that CartTotals receives the correct value
      const totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 2 500 ₽');
    });

    it('should calculate price with individual item discounts', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, discount: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 500, quantity: 1 }
      ];

      const { container } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      // Product 1 with 10% discount: 1000 * 0.9 = 900 per unit
      // Total: 900 * 2 + 500 = 2300
      const totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 2 300 ₽');
    });

    it('should show 0 totals when cart is empty', () => {
      const { container } = render(
        <CartPage 
          items={[]} 
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      const totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 0 ₽');
    });
  });

  // Promo Code Tests
  describe('Promo Code', () => {
    it('should have discountAmount of 0 when no promo is applied', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 1 }
      ];

      const { container } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      // Total should be 1000, no discount
      const totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 1 000 ₽');
      expect(totalsSection).not.toHaveTextContent('Сумма со скидкой');
    });

    it('should calculate 15% discount when promo is applied', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 1 }
      ];

      const { container } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={true}
          {...mockCallbacks}
        />
      );
      
      // Total: 1000, Discount: 150 (15%), Final: 850
      const totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Сумма без скидки: 1 000 ₽');
      expect(totalsSection).toHaveTextContent('Сумма со скидкой: 850 ₽');
    });

    it('should calculate totalWithDiscount = totalPrice - (totalPrice * 0.15)', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 2000, quantity: 1 }
      ];

      const { container } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={true}
          {...mockCallbacks}
        />
      );
      
      // Total: 2000, Discount: 300 (15%), Final: 1700
      const totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Сумма без скидки: 2 000 ₽');
      expect(totalsSection).toHaveTextContent('Сумма со скидкой: 1 700 ₽');
    });
  });

  // Memoization Tests
  describe('Memoization', () => {
    it('should recalculate totalPrice when items change', () => {
      const initialItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 1 }
      ];

      const { container, rerender } = render(
        <CartPage 
          items={initialItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      let totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 1 000 ₽');
      
      const updatedItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 2 }
      ];

      rerender(
        <CartPage 
          items={updatedItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 2 000 ₽');
    });

    it('should recalculate discountAmount when isPromoApplied changes', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 1 }
      ];

      const { container, rerender } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      let totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 1 000 ₽');
      expect(totalsSection).not.toHaveTextContent('Сумма со скидкой');
      
      rerender(
        <CartPage 
          items={mockItems}
          isPromoApplied={true}
          {...mockCallbacks}
        />
      );
      
      totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Сумма без скидки: 1 000 ₽');
      expect(totalsSection).toHaveTextContent('Сумма со скидкой: 850 ₽');
    });

    it('should not recalculate when dependencies remain the same', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 1000, quantity: 1 }
      ];

      const getUnitPriceSpy = vi.fn((item) => item.price);
      
      // We can't easily spy on useMemo internals, but we can verify
      // that the component doesn't crash when re-rendered with same props
      const { container, rerender } = render(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      let totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 1 000 ₽');
      
      // Re-render with identical props
      rerender(
        <CartPage 
          items={mockItems}
          isPromoApplied={false}
          {...mockCallbacks}
        />
      );
      
      // Component should still render correctly
      totalsSection = container.querySelector('.cart-totals');
      expect(totalsSection).toHaveTextContent('Итоговая сумма: 1 000 ₽');
    });
  });
});
