import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuantityControl } from './QuantityControl';

describe('QuantityControl', () => {
  const defaultProps = {
    quantity: 2,
    onDecrease: vi.fn(),
    onIncrease: vi.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<QuantityControl {...defaultProps} {...props} />);

  it('Рендер: Отображает текущее количество', () => {
    renderComponent({ quantity: 5 });

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('Рендер: Отображает кнопки уменьшения и увеличения', () => {
    renderComponent();

    expect(screen.getByLabelText('Уменьшить количество')).toBeInTheDocument();
    expect(screen.getByLabelText('Увеличить количество')).toBeInTheDocument();
  });

  it('Click decrease: Вызывает onDecrease', () => {
    const mockDecrease = vi.fn();
    renderComponent({ onDecrease: mockDecrease });

    fireEvent.click(screen.getByLabelText('Уменьшить количество'));

    expect(mockDecrease).toHaveBeenCalledTimes(1);
  });

  it('Click increase: Вызывает onIncrease', () => {
    const mockIncrease = vi.fn();
    renderComponent({ onIncrease: mockIncrease });

    fireEvent.click(screen.getByLabelText('Увеличить количество'));

    expect(mockIncrease).toHaveBeenCalledTimes(1);
  });

  it('Quantity 0: Отображает 0', () => {
    renderComponent({ quantity: 0 });

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('Quantity 1: Отображает 1', () => {
    renderComponent({ quantity: 1 });

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('Large quantity: Отображает большое число', () => {
    renderComponent({ quantity: 999 });

    expect(screen.getByText('999')).toBeInTheDocument();
  });
});
