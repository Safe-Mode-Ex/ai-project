import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartTotals } from './CartTotals';

describe('CartTotals', () => {
  it('should render total price without promo', () => {
    render(<CartTotals isPromoApplied={false} totalPrice={1000} totalWithDiscount={800} />);
    expect(screen.getByText('Итоговая сумма: 1 000 ₽')).toBeInTheDocument();
    expect(screen.queryByText('Сумма со скидкой')).not.toBeInTheDocument();
  });

  it('should render both prices when promo is applied', () => {
    render(<CartTotals isPromoApplied totalPrice={1000} totalWithDiscount={800} />);
    expect(screen.getByText('Сумма без скидки: 1 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Сумма со скидкой: 800 ₽')).toBeInTheDocument();
  });

  it('should format large numbers correctly', () => {
    render(<CartTotals isPromoApplied={false} totalPrice={1000000} totalWithDiscount={0} />);
    expect(screen.getByText(/1 000 000/)).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    render(<CartTotals isPromoApplied={false} totalPrice={0} totalWithDiscount={0} />);
    expect(screen.getByText(/0 ₽/)).toBeInTheDocument();
  });
});
