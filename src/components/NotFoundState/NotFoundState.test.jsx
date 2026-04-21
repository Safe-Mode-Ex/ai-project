import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { NotFoundState } from './NotFoundState';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFoundState', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <NotFoundState />
      </MemoryRouter>
    );

  it('Рендер: Отображает сообщение "Товар не найден"', () => {
    renderComponent();

    expect(screen.getByText('Товар не найден')).toBeInTheDocument();
  });

  it('Рендер: Отображает кнопку "Вернуться в каталог"', () => {
    renderComponent();

    expect(screen.getByText('Вернуться в каталог')).toBeInTheDocument();
  });

  it('Click: Вызывает navigate на корневой путь', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Вернуться в каталог'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
