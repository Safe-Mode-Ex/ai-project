import { useCallback, useState } from 'react';
import { getLimitMessage } from '../utils/cart';

/**
 * Кастомный хук для управления уведомлениями о лимите товаров
 * @param {number} maxProductQuantity - Максимальное количество товара
 * @returns {{
 *   isLimitNotificationOpen: boolean,
 *   limitNotificationMessage: string,
 *   showLimitNotification: (productName: string) => void,
 *   handleCloseLimitNotification: () => void
 * }} Объект с состоянием и обработчиками уведомления
 */
export function useLimitNotification(maxProductQuantity) {
  const [isLimitNotificationOpen, setIsLimitNotificationOpen] = useState(false);
  const [limitNotificationMessage, setLimitNotificationMessage] = useState('');

  const showLimitNotification = useCallback((productName) => {
    setLimitNotificationMessage(getLimitMessage(productName, maxProductQuantity));
    setIsLimitNotificationOpen(true);
  }, [maxProductQuantity]);

  const handleCloseLimitNotification = useCallback(() => {
    setIsLimitNotificationOpen(false);
  }, []);

  return {
    isLimitNotificationOpen,
    limitNotificationMessage,
    showLimitNotification,
    handleCloseLimitNotification,
  };
}
