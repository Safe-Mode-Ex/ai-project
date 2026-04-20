import { useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { getUnitPrice } from '../../utils/price';
import { PROMO_DISCOUNT_PERCENT } from '../../constants/cart';
import { CartTable } from '../../components/CartTable/CartTable';
import { PromoCodeForm } from '../../components/PromoCodeForm/PromoCodeForm';
import { CartTotals } from '../../components/CartTotals/CartTotals';
import './CartPage.css';

/**
 * Компонент страницы корзины - отображает корзину с товарами, форму промокода и итоговую сумму
 * @param {Array} items - Массив товаров в корзине
 * @param {boolean} isPromoApplied - Флаг применения промокода
 * @param {Function} onRemoveItem - Callback для удаления товара из корзины
 * @param {Function} onDecreaseQuantity - Callback для уменьшения количества товара
 * @param {Function} onIncreaseQuantity - Callback для увеличения количества товара
 * @param {Function} onApplyPromoCode - Callback для применения промокода
 * @returns {JSX.Element} Компонент страницы корзины
 */
export function CartPage({ items, isPromoApplied, onRemoveItem, onDecreaseQuantity, onIncreaseQuantity, onApplyPromoCode }) {
  const totalPrice = useMemo(() => items.reduce((total, item) => total + getUnitPrice(item) * item.quantity, 0), [items]);
  const discountAmount = useMemo(
    () => (isPromoApplied ? totalPrice * (PROMO_DISCOUNT_PERCENT / 100) : 0),
    [isPromoApplied, totalPrice],
  );
  const totalWithDiscount = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

  return (
    <main className="cart-page">
      <Container maxWidth="lg" className="cart-page__container">
        <Typography variant="h4" component="h1">
          Корзина
        </Typography>

        <CartTable
          items={items}
          onRemoveItem={onRemoveItem}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity}
        />
        <div className="cart-page__summary">
          <PromoCodeForm isPromoApplied={isPromoApplied} onApplyPromoCode={onApplyPromoCode} />
          <CartTotals isPromoApplied={isPromoApplied} totalPrice={totalPrice} totalWithDiscount={totalWithDiscount} />
        </div>
      </Container>
    </main>
  );
}
