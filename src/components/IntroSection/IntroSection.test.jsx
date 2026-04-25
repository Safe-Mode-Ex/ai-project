import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IntroSection } from './IntroSection';

describe('IntroSection', () => {
  it('Базовый рендеринг: Компонент рендерится без ошибок', () => {
    const { container } = render(<IntroSection />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Заголовок отображается: Текст "Добро пожаловать в Tech Store" присутствует', () => {
    render(<IntroSection />);
    expect(screen.getByText('Добро пожаловать в Tech Store')).toBeInTheDocument();
  });

  it('Описание отображается: Текст описания присутствует', () => {
    render(<IntroSection />);
    expect(screen.getByText(/Ваш надежный магазин электроники и гаджетов/)).toBeInTheDocument();
  });
});
