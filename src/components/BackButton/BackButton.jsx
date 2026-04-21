import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

/**
 * Back to catalog button component
 */
export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIosNewIcon />}
      onClick={() => navigate('/')}
      className="product-detail-page__back"
    >
      Назад в каталог
    </Button>
  );
}
