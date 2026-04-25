import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductGallery } from './ProductGallery';

vi.mock('../../hooks/useGallery/useGallery', () => ({
  useGallery: () => ({
    currentIndex: 0,
    direction: 'next',
    goTo: vi.fn(),
    next: vi.fn(),
    prev: vi.fn(),
  }),
}));

describe('ProductGallery', () => {
  const mockImages = [
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg',
    'https://example.com/img3.jpg',
  ];

  const renderComponent = (props = {}) =>
    render(
      <ProductGallery
        images={mockImages}
        name="Test Product"
        {...props}
      />
    );

  it('Рендер: Отображает все слайды', () => {
    renderComponent();

    mockImages.forEach((_, index) => {
      expect(screen.getByAltText(`Test Product - фото ${index + 1}`)).toBeInTheDocument();
    });
  });

  it('Рендер: Отображает навигационные кнопки', () => {
    renderComponent();

    expect(screen.getByLabelText('Предыдущее изображение')).toBeInTheDocument();
    expect(screen.getByLabelText('Следующее изображение')).toBeInTheDocument();
  });

  it('Рендер: Отображает навигационные точки', () => {
    renderComponent();

    mockImages.forEach((_, index) => {
      expect(screen.getAllByRole('button', { name: /(Текущее изображение|Перейти к изображению)/ })[index]).toBeInTheDocument();
    });
  });

  it('Пустая галерея: Рендерится без ошибок', () => {
    renderComponent({ images: [] });

    expect(screen.getByLabelText('Предыдущее изображение')).toBeInTheDocument();
    expect(screen.getByLabelText('Следующее изображение')).toBeInTheDocument();
  });
});
