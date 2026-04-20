import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromoCodeForm } from './PromoCodeForm';

describe('PromoCodeForm', () => {
  let mockOnApplyPromoCode;

  beforeEach(() => {
    mockOnApplyPromoCode = vi.fn();
  });

  describe('Rendering', () => {
    it('Базовый рендеринг: Компонент рендерится без ошибок с базовыми props', () => {
      const { container } = render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('TextField отображается: Поле ввода промокода присутствует в DOM', () => {
      render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );
      const textField = screen.getByRole('textbox');
      expect(textField).toBeInTheDocument();
    });

    it('Button отображается: Кнопка "Применить" присутствует в DOM', () => {
      render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );
      const button = screen.getByRole('button', { name: 'Применить' });
      expect(button).toBeInTheDocument();
    });

    it('Label корректный: TextField имеет label "Промокод"', () => {
      render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );
      const label = screen.getByLabelText('Промокод');
      expect(label).toBeInTheDocument();
    });

    it('Класс контейнера: Форма имеет класс promo-code-form', () => {
      const { container } = render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );
      const form = container.querySelector('.promo-code-form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('Пустой промокод: Обработка пустой строки при отправке', () => {
      mockOnApplyPromoCode.mockReturnValue(false);
      render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );

      const button = screen.getByRole('button', { name: 'Применить' });
      fireEvent.click(button);

      expect(mockOnApplyPromoCode).toHaveBeenCalledWith('');
    });

    it('Промокод с пробелами: Обработка промокода с пробелами по краям', () => {
      mockOnApplyPromoCode.mockReturnValue(true);
      render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );

      const textField = screen.getByRole('textbox');
      fireEvent.change(textField, { target: { value: '  PROMO123  ' } });

      const button = screen.getByRole('button', { name: 'Применить' });
      fireEvent.click(button);

      expect(mockOnApplyPromoCode).toHaveBeenCalledWith('PROMO123');
    });

    it('onApplyPromoCode undefined: Компонент не крашится без callback', () => {
      const { container } = render(
        <PromoCodeForm
          isPromoApplied={false}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('isPromoApplied undefined: Обработка отсутствующего пропа', () => {
      const { container } = render(
        <PromoCodeForm
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Длинный промокод: Обработка очень длинного ввода', () => {
      const longPromoCode = 'A'.repeat(1000);
      render(
        <PromoCodeForm
          isPromoApplied={false}
          onApplyPromoCode={mockOnApplyPromoCode}
        />
      );

      const textField = screen.getByRole('textbox');
      fireEvent.change(textField, { target: { value: longPromoCode } });

      expect(textField).toHaveValue(longPromoCode);
    });
  });
});
