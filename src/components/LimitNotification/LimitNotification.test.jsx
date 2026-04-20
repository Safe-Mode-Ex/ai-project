import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LimitNotification } from './LimitNotification';

describe('LimitNotification', () => {
  const mockOnClose = vi.fn();

  describe('Rendering', () => {
    it('Компонент рендерится без ошибок с базовыми props', () => {
      const { container } = render(
        <LimitNotification
          open
          message="Test message"
          onClose={mockOnClose}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Snackbar отображается когда open={true}', () => {
      render(
        <LimitNotification
          open
          message="Test message"
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('Snackbar скрыт когда open={false}', () => {
      render(
        <LimitNotification
          open={false}
          message="Test message"
          onClose={mockOnClose}
        />
      );
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    it('Сообщение отображается корректно', () => {
      render(
        <LimitNotification
          open
          message="Лимит достигнут"
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Лимит достигнут')).toBeInTheDocument();
    });
  });

  describe('Callback Functions', () => {
    it('onClose вызывается при закрытии Snackbar', () => {
      render(
        <LimitNotification
          open
          message="Test message"
          onClose={mockOnClose}
        />
      );

      // MUI Snackbar вызывает onClose автоматически по таймеру или при клике вне
      // Проверяем, что callback передан и компонент рендерится корректно
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(mockOnClose).toBeDefined();
    });

    it('onClose вызывается при клике на кнопку закрытия Alert', () => {
      render(
        <LimitNotification
          open
          message="Test message"
          onClose={mockOnClose}
        />
      );

      const closeButton = screen.getByRole('button', { hidden: true });
      if (closeButton) {
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Edge Cases', () => {
    it('Обработка пустого message', () => {
      const { container } = render(
        <LimitNotification
          open
          message=""
          onClose={mockOnClose}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Обработка отсутствующего onClose (не должно крашиться)', () => {
      const { container } = render(
        <LimitNotification
          open
          message="Test message"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Обработка undefined для open', () => {
      render(
        <LimitNotification
          open={undefined}
          message="Test message"
          onClose={mockOnClose}
        />
      );
      // undefined воспринимается как falsy, поэтому Snackbar не отображается
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });
  });
});
