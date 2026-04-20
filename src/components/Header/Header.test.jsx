import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

const renderHeader = (cartCount = 0) => render(
  <MemoryRouter>
    <Header cartCount={cartCount} />
  </MemoryRouter>
);

describe('Header', () => {
  describe('Rendering', () => {
    it('Базовый рендеринг: Компонент рендерится без ошибок', () => {
      const { container } = renderHeader(0);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Заголовок отображается: Текст "Tech Store" присутствует в DOM', () => {
      renderHeader(0);
      expect(screen.getByText('Tech Store')).toBeInTheDocument();
    });

    it('Иконка корзины отображается: ShoppingCartIcon присутствует', () => {
      renderHeader(0);
      const cartIcon = document.querySelector('svg[data-testid="ShoppingCartIcon"]');
      expect(cartIcon).toBeInTheDocument();
    });
  });

  describe('Badge Display', () => {
    it('cartCount > 1: Бейдж показывает правильное число', () => {
      renderHeader(5);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('cartCount undefined/null: Обработка отсутствующего пропа', () => {
      const { container } = render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('Заголовок ссылается на "/": Проверка to="/"', () => {
      renderHeader(0);
      const titleLink = screen.getByText('Tech Store').closest('a');
      expect(titleLink).toHaveAttribute('href', '/');
    });

    it('Корзина ссылается на "/cart": Проверка to="/cart"', () => {
      renderHeader(0);
      const cartButton = screen.getByLabelText('Перейти в корзину').closest('a');
      expect(cartButton).toHaveAttribute('href', '/cart');
    });
  });

  describe('Accessibility', () => {
    it('aria-label на кнопке корзины: Текст "Перейти в корзину" присутствует', () => {
      renderHeader(0);
      expect(screen.getByLabelText('Перейти в корзину')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('Отрицательный cartCount: Обработка некорректных данных', () => {
      const { container } = renderHeader(-5);
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('-5')).toBeInTheDocument();
    });

    it('Очень большие значения: Поведение при cartCount > 99', () => {
      renderHeader(150);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });
  });
});
