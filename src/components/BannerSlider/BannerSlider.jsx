import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { banners } from '../../data/banners';
import './BannerSlider.css';

/**
 * Компонент слайдера баннеров для главной страницы
 * Отображает изображения на всю ширину с автоматическим переключением
 * @returns {JSX.Element}
 */
export function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <Box
      className="banner-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box className="banner-slider__container">
        {banners.map((banner, index) => (
          <Box
            key={banner.id}
            className={`banner-slider__slide ${index === currentIndex ? 'banner-slider__slide--active' : ''}`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="banner-slider__image"
            />
            <Box className="banner-slider__overlay">
              <Typography variant="h2" component="h2" className="banner-slider__title">
                {banner.title}
              </Typography>
              <Typography variant="h5" component="p" className="banner-slider__subtitle">
                {banner.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        className="banner-slider__nav banner-slider__nav--prev"
        onClick={goToPrev}
        aria-label="Предыдущий слайд"
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        className="banner-slider__nav banner-slider__nav--next"
        onClick={goToNext}
        aria-label="Следующий слайд"
      >
        <ChevronRightIcon />
      </IconButton>

      <Box className="banner-slider__dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`banner-slider__dot ${index === currentIndex ? 'banner-slider__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </Box>
    </Box>
  );
}
