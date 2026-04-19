import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductGrid } from './ProductGrid';
import { ProductCard } from '../ProductCard/ProductCard';

// Mock ProductCard to simplify testing
vi.mock('../ProductCard/ProductCard', () => ({
  ProductCard: ({ product, onAddToCart }) => {
    if (!product) return null;
    return (
      <div data-testid="product-card" data-product-id={product.id}>
        <span data-testid="product-name">{product.name}</span>
        <button onClick={() => onAddToCart?.(product)}>Add to Cart</button>
      </div>
    );
  },
}));

describe('ProductGrid', () => {
  let mockOnAddToCart;
  const mockProducts = [
    {
      id: 1,
      name: 'Беспроводные наушники Sonic Air',
      price: 5990,
      discount: 15,
      description: 'Легкие наушники с шумоподавлением и до 30 часов работы.',
      image: 'https://loremflickr.com/360/240/wireless,headphones?lock=1',
    },
    {
      id: 2,
      name: 'Умные часы Pulse X',
      price: 8990,
      description: 'Отслеживание сна, пульса и активности с AMOLED-экраном.',
      image: 'https://loremflickr.com/360/240/smartwatch,watch?lock=2',
    },
  ];

  beforeEach(() => {
    mockOnAddToCart = vi.fn();
  });

  describe('Rendering', () => {
    it('Базовый рендеринг: Компонент рендерится без ошибок с базовыми props', () => {
      const { container } = render(
        <ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Секция с классом product-grid отображается', () => {
      const { container } = render(
        <ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />
      );
      expect(container.querySelector('.product-grid')).toBeInTheDocument();
    });

    it('ProductCard рендерится для каждого продукта', () => {
      render(<ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />);
      const cards = screen.getAllByTestId('product-card');
      expect(cards).toHaveLength(2);
    });

    it('Названия продуктов отображаются корректно', () => {
      render(<ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />);
      expect(screen.getByText('Беспроводные наушники Sonic Air')).toBeInTheDocument();
      expect(screen.getByText('Умные часы Pulse X')).toBeInTheDocument();
    });
  });

  describe('Props Passing', () => {
    it('onAddToCart передается в каждый ProductCard', () => {
      render(<ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />);
      const buttons = screen.getAllByText('Add to Cart');
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    it('Каждый ProductCard получает правильный product', () => {
      render(<ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />);
      const cards = screen.getAllByTestId('product-card');
      expect(cards[0]).toHaveAttribute('data-product-id', '1');
      expect(cards[1]).toHaveAttribute('data-product-id', '2');
    });

    it('key prop используется правильно (product.id)', () => {
      const { container } = render(
        <ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />
      );
      const cards = container.querySelectorAll('[data-product-id]');
      expect(cards).toHaveLength(2);
    });
  });

  describe('Edge Cases', () => {
    it('Пустой массив продуктов: Компонент рендерится без карточек', () => {
      const { container } = render(
        <ProductGrid products={[]} onAddToCart={mockOnAddToCart} />
      );
      expect(container.querySelector('.product-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    });

    it('products undefined: Обработка отсутствующего пропа', () => {
      const { container } = render(
        <ProductGrid onAddToCart={mockOnAddToCart} />
      );
      expect(container.querySelector('.product-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    });

    it('products null: Обработка null значения', () => {
      const { container } = render(
        <ProductGrid products={null} onAddToCart={mockOnAddToCart} />
      );
      expect(container.querySelector('.product-grid')).toBeInTheDocument();
    });

    it('onAddToCart undefined: Компонент рендерится без callback', () => {
      const { container } = render(
        <ProductGrid products={mockProducts} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Большое количество продуктов: Рендеринг с 10+ продуктами', () => {
      const manyProducts = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: 1000,
        description: 'Description',
        image: 'https://example.com/image.jpg',
      }));
      const { container } = render(
        <ProductGrid products={manyProducts} onAddToCart={mockOnAddToCart} />
      );
      const cards = screen.getAllByTestId('product-card');
      expect(cards).toHaveLength(15);
    });

    it('Продукт с неполными данными: Обработка некорректных данных', () => {
      const incompleteProducts = [
        { id: 1, name: 'Incomplete Product' },
        { id: 2, name: 'Another Product', price: 5000 },
      ];
      const { container } = render(
        <ProductGrid products={incompleteProducts} onAddToCart={mockOnAddToCart} />
      );
      expect(container.firstChild).toBeInTheDocument();
      const cards = screen.getAllByTestId('product-card');
      expect(cards).toHaveLength(2);
    });
  });

  describe('Callback Functions', () => {
    it('onAddToCart вызывается с правильным продуктом при клике', () => {
      render(<ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />);
      const buttons = screen.getAllByText('Add to Cart');
      
      buttons[0].click();
      expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0]);
      
      buttons[1].click();
      expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[1]);
    });

    it('onAddToCart вызывается для каждого продукта отдельно', () => {
      render(<ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />);
      const buttons = screen.getAllByText('Add to Cart');
      
      buttons[0].click();
      buttons[0].click();
      buttons[1].click();
      
      expect(mockOnAddToCart).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('Секция имеет правильную структуру DOM', () => {
      const { container } = render(
        <ProductGrid products={mockProducts} onAddToCart={mockOnAddToCart} />
      );
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('product-grid');
    });
  });
});
