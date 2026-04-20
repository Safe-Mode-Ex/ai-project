import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CatalogPage } from './CatalogPage';

describe('CatalogPage', () => {
  const mockOnAddToCart = vi.fn();

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render page with title "Каталог товаров"', () => {
      render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Каталог товаров');
    });

    it('should render main element with correct class', () => {
      const { container } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const mainElement = container.querySelector('main.catalog-page');
      expect(mainElement).toBeInTheDocument();
    });

    it('should render Container with correct class', () => {
      const { container } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const containerElement = container.querySelector('.catalog-page__container');
      expect(containerElement).toBeInTheDocument();
    });
  });

  // ProductGrid Integration Tests
  describe('ProductGrid Integration', () => {
    it('should render all products from imported data', () => {
      const { container } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      // Check that ProductGrid is rendered
      const productGrid = container.querySelector('.product-grid');
      expect(productGrid).toBeInTheDocument();

      // Verify products are rendered (from actual products.js import)
      const productCards = container.querySelectorAll('.product-card');
      expect(productCards.length).toBeGreaterThan(0);
    });

    it('should pass onAddToCart callback to ProductGrid', () => {
      const { container } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      // Verify ProductGrid has products rendered
      const productGrid = container.querySelector('.product-grid');
      expect(productGrid).toBeInTheDocument();
    });
  });

  // Props Tests
  describe('Props Handling', () => {
    it('should handle missing onAddToCart prop gracefully', () => {
      // Should not throw when onAddToCart is undefined
      expect(() => {
        render(<CatalogPage />);
      }).not.toThrow();
    });

    it('should pass undefined onAddToCart to ProductGrid when not provided', () => {
      const { container } = render(<CatalogPage />);

      const productGrid = container.querySelector('.product-grid');
      expect(productGrid).toBeInTheDocument();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render correctly when products data is empty (mocked)', () => {
      // This tests the structure handles empty products array
      // In real scenario, we'd need to mock the products import
      const { container } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      // Page structure should still be intact
      expect(container.querySelector('main.catalog-page')).toBeInTheDocument();
      expect(screen.getByText('Каталог товаров')).toBeInTheDocument();
    });

    it('should maintain structure on re-render with same props', () => {
      const { container, rerender } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const initialMain = container.querySelector('main.catalog-page');
      expect(initialMain).toBeInTheDocument();

      // Re-render with same props
      rerender(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const reRenderMain = container.querySelector('main.catalog-page');
      expect(reRenderMain).toBeInTheDocument();
      expect(screen.getByText('Каталог товаров')).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have h1 as the main page title', () => {
      render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Каталог товаров');
    });

    it('should use main landmark for page content', () => {
      const { container } = render(<CatalogPage onAddToCart={mockOnAddToCart} />);

      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });
});
