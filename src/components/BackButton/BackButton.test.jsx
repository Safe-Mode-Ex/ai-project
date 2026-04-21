import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { BackButton } from './BackButton';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('BackButton', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );

  it('Рендер: Отображает кнопку с текстом "Назад в каталог"', () => {
    renderComponent();

    expect(screen.getByText('Назад в каталог')).toBeInTheDocument();
  });

  it('Иконка: Отображает иконку назад', () => {
    renderComponent();

    const button = screen.getByText('Назад в каталог').closest('button');
    expect(button).toBeInTheDocument();
  });

  it('Click: Вызывает navigate на корневой путь', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Назад в каталог'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
