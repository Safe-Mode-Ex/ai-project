import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';

const renderWithRouter = (component) => render(<MemoryRouter>{component}</MemoryRouter>);

describe('ProductCard', () => {
  const mockOnAddToCart = vi.fn();

  it('should not render anything when no product data is passed', () => {
    const { container } = renderWithRouter(<ProductCard product={null} onAddToCart={mockOnAddToCart} />);

    expect(container.firstChild).toBeNull();
  });

  it('should not render anything when product is undefined', () => {
    const { container } = renderWithRouter(<ProductCard product={undefined} onAddToCart={mockOnAddToCart} />);

    expect(container.firstChild).toBeNull();
  });

  it('should not show discount when no discount is provided', () => {
    const product = {
      name: 'Test Product',
      description: 'Test Description',
      price: 1000,
      image: 'test-image.jpg'
    };

    renderWithRouter(<ProductCard product={product} onAddToCart={mockOnAddToCart} />);

    // Check that old price element is not displayed
    const oldPriceElement = document.querySelector('.product-card__price-old');
    expect(oldPriceElement).toBeNull();

    // Check that regular price is displayed (with Russian locale formatting)
    const priceElement = screen.getByText('1 000 ₽');
    expect(priceElement).toBeInTheDocument();
  });

  it('should show discount when discount is provided', () => {
    const product = {
      name: 'Test Product',
      description: 'Test Description',
      price: 1000,
      discount: 20,
      image: 'test-image.jpg'
    };

    renderWithRouter(<ProductCard product={product} onAddToCart={mockOnAddToCart} />);

    // Check that old price element is displayed
    const oldPriceElement = document.querySelector('.product-card__price-old');
    expect(oldPriceElement).toBeInTheDocument();
    expect(oldPriceElement).toHaveTextContent('1 000 ₽');

    // Check that discounted price is displayed
    const discountedPriceElement = screen.getByText('800 ₽');
    expect(discountedPriceElement).toBeInTheDocument();
  });
});
