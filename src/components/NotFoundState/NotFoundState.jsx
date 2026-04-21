import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Not found state component when product doesn't exist
 */
export function NotFoundState() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" className="product-detail-page">
      <Typography variant="h4" className="product-detail-page__not-found">
        Товар не найден
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        className="product-detail-page__back-btn"
      >
        Вернуться в каталог
      </Button>
    </Container>
  );
}
