import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GallerySlide } from './GallerySlide';

describe('GallerySlide', () => {
  const defaultProps = {
    image: 'https://example.com/image.jpg',
    alt: 'Test image',
    index: 0,
    currentIndex: 0,
    total: 3,
    direction: 'next',
  };

  it('Active slide: Имеет класс --active', () => {
    render(<GallerySlide {...defaultProps} index={0} currentIndex={0} />);

    const slide = screen.getByAltText('Test image').closest('.product-detail-page__gallery-slide');
    expect(slide?.className).toContain('product-detail-page__gallery-slide--active');
  });

  it('Previous slide: Имеет класс --prev', () => {
    render(<GallerySlide {...defaultProps} index={0} currentIndex={1} />);

    const slide = screen.getByAltText('Test image').closest('.product-detail-page__gallery-slide');
    expect(slide?.className).toContain('product-detail-page__gallery-slide--prev');
  });

  it('Next slide: Имеет класс --next', () => {
    render(<GallerySlide {...defaultProps} index={2} currentIndex={1} />);

    const slide = screen.getByAltText('Test image').closest('.product-detail-page__gallery-slide');
    expect(slide?.className).toContain('product-detail-page__gallery-slide--next');
  });

  it('Отображает изображение с корректным src и alt', () => {
    render(<GallerySlide {...defaultProps} image="https://example.com/test.jpg" alt="Custom alt" />);

    const img = screen.getByAltText('Custom alt');
    expect(img).toHaveAttribute('src', 'https://example.com/test.jpg');
  });

  it('Циклический prev: При currentIndex=0 последний слайд имеет класс --prev', () => {
    render(<GallerySlide {...defaultProps} index={2} currentIndex={0} total={3} />);

    const slide = screen.getByAltText('Test image').closest('.product-detail-page__gallery-slide');
    expect(slide?.className).toContain('product-detail-page__gallery-slide--prev');
  });

  it('Циклический next: При currentIndex=последний первый слайд имеет класс --next', () => {
    render(<GallerySlide {...defaultProps} index={0} currentIndex={2} total={3} />);

    const slide = screen.getByAltText('Test image').closest('.product-detail-page__gallery-slide');
    expect(slide?.className).toContain('product-detail-page__gallery-slide--next');
  });
});
