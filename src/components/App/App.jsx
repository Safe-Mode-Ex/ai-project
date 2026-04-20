import { Routes, Route } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { LimitNotification } from '../LimitNotification/LimitNotification';
import { CartPage } from '../../pages/CartPage/CartPage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';
import { MAX_PRODUCT_QUANTITY, PROMO_CODE } from '../../constants/cart';
import { getCartCount } from '../../utils/cart';
import { useLimitNotification } from '../../hooks/useLimitNotification';

/**
 * Основной компонент приложения, управляющий состоянием корзины и маршрутизацией
 * @returns {JSX.Element} Отрисованное приложение с хедером и маршрутами
 */
export function App() {
  const [cart, setCart] = useState({
    items: [],
    isPromoApplied: false,
  });
  const {
    isLimitNotificationOpen,
    limitNotificationMessage,
    showLimitNotification,
    handleCloseLimitNotification,
  } = useLimitNotification(MAX_PRODUCT_QUANTITY);

  const handleAddToCart = (product) => {
    let limitedProductName = null;

    setCart((prevCart) => {
      const productInCart = prevCart.items.find((item) => item.id === product.id);

      if (productInCart && productInCart.quantity >= MAX_PRODUCT_QUANTITY) {
        limitedProductName = product.name;
        return prevCart;
      }

      if (productInCart) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
        };
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { ...product, quantity: 1 }],
      };
    });

    if (limitedProductName) {
      showLimitNotification(limitedProductName);
    }
  };

  const handleRemoveFromCart = useCallback((productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== productId),
    }));
  }, []);

  const handleDecreaseQuantity = useCallback((productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    }));
  }, []);

  const handleIncreaseQuantity = useCallback((productId) => {
    let limitedProductName = null;

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= MAX_PRODUCT_QUANTITY) {
          limitedProductName = item.name;
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      }),
    }));

    if (limitedProductName) {
      showLimitNotification(limitedProductName);
    }
  }, [showLimitNotification]);

  const handleApplyPromoCode = (promoCode) => {
    let isApplied = false;

    setCart((prevCart) => {
      if (prevCart.isPromoApplied || promoCode !== PROMO_CODE) {
        return prevCart;
      }

      isApplied = true;
      return {
        ...prevCart,
        isPromoApplied: true,
      };
    });

    return isApplied;
  };

  const cartCount = getCartCount(cart.items);

  return (
    <>
      <Header cartCount={cartCount} />
      <LimitNotification
        open={isLimitNotificationOpen}
        message={limitNotificationMessage}
        onClose={handleCloseLimitNotification}
      />
      <Routes>
          <Route
            path="/"
            element={
              <CatalogPage onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                items={cart.items}
                isPromoApplied={cart.isPromoApplied}
                onRemoveItem={handleRemoveFromCart}
                onDecreaseQuantity={handleDecreaseQuantity}
                onIncreaseQuantity={handleIncreaseQuantity}
                onApplyPromoCode={handleApplyPromoCode}
              />
            }
          />
        </Routes>
      <Footer />
    </>
  );
}
