import { Alert, Snackbar } from '@mui/material';
import './LimitNotification.css';

export function LimitNotification({ open, message, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={onClose} severity="warning" variant="filled" className="limit-notification__alert">
        {message}
      </Alert>
    </Snackbar>
  );
}
