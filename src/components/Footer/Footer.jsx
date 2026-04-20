import { Container, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import './Footer.css';

/**
 * Компонент футера с контактной информацией
 * Отображает адрес и телефон академии
 * @returns {JSX.Element}
 */
export function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="xl">
        <Box className="footer__content">
          <Typography variant="h6" className="footer__title">
            Контакты
          </Typography>
          <Box className="footer__contacts">
            <Box className="footer__contact-item">
              <LocationOnIcon className="footer__icon" />
              <Typography variant="body1" className="footer__text">
                Санкт-Петербург, Набережная реки Карповки, 5л
              </Typography>
            </Box>
            <Box className="footer__contact-item">
              <PhoneIcon className="footer__icon" />
              <Typography
                variant="body1"
                component="a"
                href="tel:88008553535"
                className="footer__text footer__link"
              >
                8 800 855 3535
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
