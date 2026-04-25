import { Container, Typography, Box } from '@mui/material';
import { Map } from '../Map/Map';
import './LocationSection.css';

export function LocationSection() {
  return (
    <Box className="location-section">
      <Container maxWidth="xl">
        <Typography variant="h4" component="h2" className="location-section__title">
          Как нас найти
        </Typography>
      </Container>
      <Map />
    </Box>
  );
}
