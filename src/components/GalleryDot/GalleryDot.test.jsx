import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GalleryDot } from './GalleryDot';

describe('GalleryDot', () => {
  it('Active dot: Имеет класс модификатор --active и aria-label "Текущее изображение"', () => {
    render(<GalleryDot isActive={true} onClick={vi.fn()} />);

    const dot = screen.getByLabelText('Текущее изображение');
    expect(dot).toBeInTheDocument();
    expect(dot.className).toContain('product-detail-page__gallery-dot--active');
  });

  it('Inactive dot: Имеет aria-label "Перейти к изображению" и не имеет --active', () => {
    render(<GalleryDot isActive={false} onClick={vi.fn()} />);

    const dot = screen.getByLabelText('Перейти к изображению');
    expect(dot).toBeInTheDocument();
    expect(dot.className).not.toContain('product-detail-page__gallery-dot--active');
  });

  it('Click: Вызывает onClick при клике', () => {
    const mockClick = vi.fn();
    render(<GalleryDot isActive={false} onClick={mockClick} />);

    fireEvent.click(screen.getByLabelText('Перейти к изображению'));

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
