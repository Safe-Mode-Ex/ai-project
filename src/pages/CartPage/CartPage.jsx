import { useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { getUnitPrice } from '../../utils/price';
import { PROMO_DISCOUNT_PERCENT } from '../../constants/cart';
import { CartTable } from '../../components/CartTable/CartTable';
import { PromoCodeForm } from '../../components/PromoCodeForm/PromoCodeForm';
import { CartTotals } from '../../components/CartTotals/CartTotals';
import './CartPage.css';

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
