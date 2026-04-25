import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LocationSection } from './LocationSection';

vi.mock('../Map/Map', () => ({
  Map: () => <div data-testid="map" />,
}));

describe('LocationSection', () => {
  it('Базовый рендеринг: Компонент рендерится без ошибок', () => {
    const { container } = render(<LocationSection />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Заголовок отображается: Текст "Как нас найти" присутствует', () => {
    render(<LocationSection />);
    expect(screen.getByText('Как нас найти')).toBeInTheDocument();
  });

  it('Map компонент рендерится', () => {
    render(<LocationSection />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
