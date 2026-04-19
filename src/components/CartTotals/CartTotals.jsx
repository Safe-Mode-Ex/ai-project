import { Typography } from '@mui/material';
import './CartTotals.css';

export function CartTotals({ isPromoApplied, totalPrice, totalWithDiscount }) {
  return (
    <div className="cart-totals">
      <Typography variant="h6" color="primary" className="cart-totals__item">
        {isPromoApplied ? 'Сумма без скидки' : 'Итоговая сумма'}: {totalPrice.toLocaleString('ru-RU')} ₽
      </Typography>
      {isPromoApplied && (
        <Typography variant="h6" color="primary" className="cart-totals__item">
          Сумма со скидкой: {totalWithDiscount.toLocaleString('ru-RU')} ₽
        </Typography>
      )}
    </div>
  );
}
