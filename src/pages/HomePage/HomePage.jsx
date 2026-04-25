import { Container, Typography, Box } from '@mui/material';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { Map } from '../../components/Map/Map';
import './HomePage.css';

/**
 * Компонент главной страницы
 * Содержит слайдер баннеров и раздел "Как нас найти" с картой
 * @returns {JSX.Element}
 */
export function HomePage() {
  return (
    <>
      <BannerSlider />
      <main className="home-page">
        <Container maxWidth="xl" className="home-page__container">
          <Box className="home-page__intro">
            <Typography variant="h3" component="h1" className="home-page__title">
              Добро пожаловать в Tech Store
            </Typography>
            <Typography variant="body1" className="home-page__description">
              Ваш надежный магазин электроники и гаджетов. Мы предлагаем широкий ассортимент
              современных устройств по доступным ценам. Откройте для себя мир технологий вместе с нами!
            </Typography>
          </Box>
        </Container>
      </main>
      <Box className="location-section">
        <Container maxWidth="xl">
          <Typography variant="h4" component="h2" className="location-section__title">
            Как нас найти
          </Typography>
        </Container>
        <Map />
      </Box>
    </>
  );
}
