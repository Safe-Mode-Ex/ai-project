import { Container, Typography, Box } from '@mui/material';
import './IntroSection.css';

export function IntroSection() {
  return (
    <main className="intro-section">
      <Container maxWidth="xl" className="intro-section__container">
        <Box className="intro-section__content">
          <Typography variant="h3" component="h1" className="intro-section__title">
            Добро пожаловать в Tech Store
          </Typography>
          <Typography variant="body1" className="intro-section__description">
            Ваш надежный магазин электроники и гаджетов. Мы предлагаем широкий ассортимент
            современных устройств по доступным ценам. Откройте для себя мир технологий вместе с нами!
          </Typography>
        </Box>
      </Container>
    </main>
  );
}
