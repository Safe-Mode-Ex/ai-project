import { Alert, Snackbar } from '@mui/material';
import './LimitNotification.css';

/**
 * @typedef {Object} LimitNotificationProps
 * @property {boolean} open - Флаг открытия/закрытия уведомления
 * @property {string} message - Текст сообщения для отображения
 * @property {() => void} onClose - Callback при закрытии уведомления
 */

/**
 * Компонент уведомления о достижении лимита количества товара.
 * Отображается в виде Snackbar с Alert при превышении максимального количества.
 *
 * @param {LimitNotificationProps} props
 * @returns {JSX.Element}
 */
export function LimitNotification({ open, message, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={onClose} severity="warning" variant="filled" className="limit-notification__alert">
        {message}
      </Alert>
    </Snackbar>
  );
}
