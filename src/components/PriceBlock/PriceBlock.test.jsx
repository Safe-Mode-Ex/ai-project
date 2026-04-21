import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PriceBlock } from './PriceBlock';

describe('PriceBlock', () => {
  it('Без скидки: Отображает только текущую цену', () => {
    const product = { price: 1000, discount: 0 };
    render(<PriceBlock product={product} />);

    expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
    expect(screen.queryByText(/-/)).not.toBeInTheDocument();
  });

  it('Со скидкой: Отображает старую цену, новую цену и скидку', () => {
    const product = { price: 1000, discount: 10 };
    render(<PriceBlock product={product} />);

    expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('900 ₽')).toBeInTheDocument();
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('Undefined discount: Отображает только текущую цену', () => {
    const product = { price: 500 };
    render(<PriceBlock product={product} />);

    expect(screen.getByText('500 ₽')).toBeInTheDocument();
    expect(screen.queryByText(/-/)).not.toBeInTheDocument();
  });

  it('Скидка null: Отображает только текущую цену', () => {
    const product = { price: 500, discount: null };
    render(<PriceBlock product={product} />);

    expect(screen.getByText('500 ₽')).toBeInTheDocument();
    expect(screen.queryByText(/-/)).not.toBeInTheDocument();
  });

  it('Скидка 100%: Отображает цену 0 ₽', () => {
    const product = { price: 1000, discount: 100 };
    render(<PriceBlock product={product} />);

    expect(screen.getByText('0 ₽')).toBeInTheDocument();
    expect(screen.getByText('-100%')).toBeInTheDocument();
  });

  it('Округление: Корректно округляет цену со скидкой', () => {
    const product = { price: 99, discount: 33 };
    render(<PriceBlock product={product} />);

    expect(screen.getByText('66 ₽')).toBeInTheDocument();
  });
});
