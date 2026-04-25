import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from './HomePage';

vi.mock('../../components/BannerSlider/BannerSlider', () => ({
  BannerSlider: () => <div data-testid="banner-slider" />,
}));

vi.mock('../../components/IntroSection/IntroSection', () => ({
  IntroSection: () => <div data-testid="intro-section" />,
}));

vi.mock('../../components/PopularProductsSection/PopularProductsSection', () => ({
  PopularProductsSection: ({ onAddToCart, cartItems, onDecreaseQuantity, onIncreaseQuantity }) => (
    <div data-testid="popular-products-section">
      {onAddToCart && 'onAddToCart'}
      {cartItems && 'cartItems'}
      {onDecreaseQuantity && 'onDecreaseQuantity'}
      {onIncreaseQuantity && 'onIncreaseQuantity'}
    </div>
  ),
}));

vi.mock('../../components/LocationSection/LocationSection', () => ({
  LocationSection: () => <div data-testid="location-section" />,
}));

describe('HomePage', () => {
  const mockProps = {
    onAddToCart: vi.fn(),
    cartItems: [],
    onDecreaseQuantity: vi.fn(),
    onIncreaseQuantity: vi.fn(),
  };

  it('Базовый рендеринг: Компонент рендерится без ошибок', () => {
    const { container } = render(<HomePage {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Передает колбэки в PopularProductsSection', () => {
    render(<HomePage {...mockProps} />);
    const popularProductsSection = screen.getByTestId('popular-products-section');
    expect(popularProductsSection).toHaveTextContent('onAddToCart');
    expect(popularProductsSection).toHaveTextContent('cartItems');
    expect(popularProductsSection).toHaveTextContent('onDecreaseQuantity');
    expect(popularProductsSection).toHaveTextContent('onIncreaseQuantity');
  });

  it('Все секции рендерятся в правильном порядке', () => {
    render(<HomePage {...mockProps} />);
    const sections = screen.getAllByTestId(/banner-slider|intro-section|popular-products-section|location-section/);
    expect(sections[0]).toHaveAttribute('data-testid', 'banner-slider');
    expect(sections[1]).toHaveAttribute('data-testid', 'intro-section');
    expect(sections[2]).toHaveAttribute('data-testid', 'popular-products-section');
    expect(sections[3]).toHaveAttribute('data-testid', 'location-section');
  });
});
