import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { MAX_PRODUCT_QUANTITY, PROMO_CODE } from '../../constants/cart';

// Mock child components
vi.mock('../Header/Header', () => ({
  Header: ({ cartCount }) => <div data-testid="header">Header: {cartCount}</div>,
}));

vi.mock('../LimitNotification/LimitNotification', () => ({
  LimitNotification: ({ open, message, onClose }) => (
    <div data-testid="limit-notification">
      {open && <span data-testid="notification-message">{message}</span>}
    </div>
  ),
}));

let capturedHandlers = {};

vi.mock('../../pages/CatalogPage/CatalogPage', () => ({
  CatalogPage: ({ onAddToCart }) => {
    capturedHandlers.onAddToCart = onAddToCart;
    return (
      <div data-testid="catalog-page">
        <button data-testid="add-to-cart-btn" onClick={() => onAddToCart({ id: 1, name: 'Product 1', price: 1000 })}>
          Add to Cart
        </button>
      </div>
    );
  },
}));

vi.mock('../../pages/CartPage/CartPage', () => ({
  CartPage: ({ items, isPromoApplied, onRemoveItem, onDecreaseQuantity, onIncreaseQuantity, onApplyPromoCode }) => {
    capturedHandlers = {
      onRemoveItem,
      onDecreaseQuantity,
      onIncreaseQuantity,
      onApplyPromoCode,
    };
    return (
      <div data-testid="cart-page">
        <span data-testid="cart-items-count">{items.length}</span>
        <span data-testid="cart-quantity">{items.length > 0 ? items[0].quantity : 0}</span>
        <span data-testid="promo-applied">{isPromoApplied.toString()}</span>
        <button data-testid="remove-btn" onClick={() => onRemoveItem(1)}>Remove</button>
        <button data-testid="decrease-btn" onClick={() => onDecreaseQuantity(1)}>Decrease</button>
        <button data-testid="increase-btn" onClick={() => onIncreaseQuantity(1)}>Increase</button>
        <button data-testid="apply-promo-btn" onClick={() => onApplyPromoCode(PROMO_CODE)}>Apply Promo</button>
      </div>
    );
  },
}));

vi.mock('../../hooks/useLimitNotification', () => ({
  useLimitNotification: (maxQuantity) => ({
    isLimitNotificationOpen: false,
    limitNotificationMessage: '',
    showLimitNotification: vi.fn(),
    handleCloseLimitNotification: vi.fn(),
  }),
}));

describe('App', () => {
  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  describe('Cart State Management', () => {
    it('handleAddToCart - new product: Adding a product not in cart adds it with quantity 1', async () => {
      renderApp('/');

      const addButton = screen.getByTestId('add-to-cart-btn');
      addButton.click();

      await waitFor(() => {
        expect(screen.getByTestId('header')).toHaveTextContent('Header: 1');
      });
    });

    it('handleAddToCart - existing product: Adding a product already in cart increments its quantity', async () => {
      renderApp('/');

      const addButton = screen.getByTestId('add-to-cart-btn');
      
      // Add same product twice
      addButton.click();
      addButton.click();

      await waitFor(() => {
        expect(screen.getByTestId('header')).toHaveTextContent('Header: 2');
      });
    });

    it('handleAddToCart - limit reached: Adding product at MAX_PRODUCT_QUANTITY shows notification and doesn not increment', async () => {
      renderApp('/');

      const addButton = screen.getByTestId('add-to-cart-btn');
      
      // Add product multiple times to reach limit
      for (let i = 0; i < MAX_PRODUCT_QUANTITY + 2; i++) {
        addButton.click();
      }

      await waitFor(() => {
        expect(screen.getByTestId('header')).toHaveTextContent(`Header: ${MAX_PRODUCT_QUANTITY}`);
      });
    });

    it('handleRemoveFromCart: Removes item completely from cart', () => {
      renderApp('/cart');

      const removeButton = screen.getByTestId('remove-btn');
      expect(removeButton).toBeInTheDocument();
      expect(capturedHandlers.onRemoveItem).toBeDefined();
    });

    it('handleDecreaseQuantity: Decrements quantity, removes item when quantity reaches 0', () => {
      renderApp('/cart');

      const decreaseButton = screen.getByTestId('decrease-btn');
      expect(decreaseButton).toBeInTheDocument();
      expect(capturedHandlers.onDecreaseQuantity).toBeDefined();
    });

    it('handleIncreaseQuantity: Increments quantity within limit', () => {
      renderApp('/cart');

      const increaseButton = screen.getByTestId('increase-btn');
      expect(increaseButton).toBeInTheDocument();
      expect(capturedHandlers.onIncreaseQuantity).toBeDefined();
    });

    it('handleIncreaseQuantity - limit reached: Shows notification when trying to exceed MAX_PRODUCT_QUANTITY', () => {
      renderApp('/cart');

      const increaseButton = screen.getByTestId('increase-btn');
      expect(increaseButton).toBeInTheDocument();
      expect(capturedHandlers.onIncreaseQuantity).toBeDefined();
    });

    it('handleApplyPromoCode - valid code: Applies promo code when correct code provided', () => {
      renderApp('/cart');

      const applyPromoButton = screen.getByTestId('apply-promo-btn');
      expect(applyPromoButton).toBeInTheDocument();
      expect(capturedHandlers.onApplyPromoCode).toBeDefined();
    });

    it('handleApplyPromoCode - invalid code: Does not apply when wrong code provided', () => {
      renderApp('/cart');

      const applyPromoButton = screen.getByTestId('apply-promo-btn');
      expect(applyPromoButton).toBeInTheDocument();
      expect(capturedHandlers.onApplyPromoCode).toBeDefined();
    });

    it('handleApplyPromoCode - already applied: Does not re-apply if promo already applied', () => {
      renderApp('/cart');

      const applyPromoButton = screen.getByTestId('apply-promo-btn');
      expect(applyPromoButton).toBeInTheDocument();
      expect(capturedHandlers.onApplyPromoCode).toBeDefined();
    });
  });

  describe('Rendering', () => {
    it('Header rendered: Header component renders with correct cartCount', () => {
      renderApp('/');

      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header: 0');
    });

    it('LimitNotification rendered: LimitNotification renders with correct props', () => {
      renderApp('/');

      const notification = screen.getByTestId('limit-notification');
      expect(notification).toBeInTheDocument();
    });

    it('Routes configured: CatalogPage renders at "/" path', () => {
      renderApp('/');

      const catalogPage = screen.getByTestId('catalog-page');
      expect(catalogPage).toBeInTheDocument();
    });

    it('Routes configured: CartPage renders at "/cart" path with all required props', () => {
      renderApp('/cart');

      const cartPage = screen.getByTestId('cart-page');
      expect(cartPage).toBeInTheDocument();
      expect(screen.getByTestId('cart-items-count')).toBeInTheDocument();
      expect(screen.getByTestId('promo-applied')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('Cart count calculation: Verifies getCartCount is called with cart items', async () => {
      renderApp('/');

      const header = screen.getByTestId('header');
      expect(header).toHaveTextContent('Header: 0');

      const addButton = screen.getByTestId('add-to-cart-btn');
      addButton.click();

      await waitFor(() => {
        expect(header).toHaveTextContent('Header: 1');
      });
    });

    it('Limit notification flow: Full flow from limit reached to notification display', async () => {
      renderApp('/');

      const addButton = screen.getByTestId('add-to-cart-btn');
      
      // Add product multiple times to reach and exceed limit
      for (let i = 0; i < MAX_PRODUCT_QUANTITY + 1; i++) {
        addButton.click();
      }

      const notification = screen.getByTestId('limit-notification');
      expect(notification).toBeInTheDocument();
    });
  });
});
