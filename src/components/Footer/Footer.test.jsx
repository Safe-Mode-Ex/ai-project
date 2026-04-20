import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders footer with contacts section', () => {
    render(<Footer />);
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('displays address', () => {
    render(<Footer />);
    expect(screen.getByText('Санкт-Петербург, Набережная реки Карповки, 5л')).toBeInTheDocument();
  });

  it('displays phone number', () => {
    render(<Footer />);
    expect(screen.getByText('8 800 855 3535')).toBeInTheDocument();
  });

  it('phone link has correct href', () => {
    render(<Footer />);
    const phoneLink = screen.getByText('8 800 855 3535');
    expect(phoneLink).toHaveAttribute('href', 'tel:88008553535');
  });

  it('renders footer element with correct class', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('.footer')).toBeInTheDocument();
  });
});
