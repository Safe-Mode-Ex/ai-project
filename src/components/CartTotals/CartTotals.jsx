import { Typography } from '@mui/material';
import './CartTotals.css';

/**
 * @typedef {Object} CartTotalsProps
 * @property {boolean} isPromoApplied - Флаг, применён ли промокод
 * @property {number} totalPrice - Итоговая сумма без скидки
 * @property {number} totalWithDiscount - Итоговая сумма со скидкой
 */

/**
 * Компонент отображения итоговых сумм корзины.
 * Показывает сумму без скидки и сумму со скидкой (если промокод применён).
 *
 * @param {CartTotalsProps} props
 * @returns {JSX.Element}
 */
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
