import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGallery } from '../../hooks/useGallery/useGallery';
import { GallerySlide } from './GallerySlide';
import { GalleryDot } from './GalleryDot';

/**
 * Product gallery component with image slider
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {string} props.name - Product name for alt text
 */
export function ProductGallery({ images, name }) {
  const { currentIndex, direction, goTo, next, prev } = useGallery(images.length);

  return (
    <Box className="product-detail-page__gallery">
      <Box className="product-detail-page__gallery-slider">
        <IconButton
          className="product-detail-page__gallery-nav product-detail-page__gallery-nav--prev"
          onClick={prev}
          aria-label="Предыдущее изображение"
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box className="product-detail-page__gallery-slides">
          {images.map((image, index) => (
            <GallerySlide
              key={image}
              image={image}
              alt={`${name} - фото ${index + 1}`}
              index={index}
              currentIndex={currentIndex}
              total={images.length}
              direction={direction}
            />
          ))}
        </Box>

        <IconButton
          className="product-detail-page__gallery-nav product-detail-page__gallery-nav--next"
          onClick={next}
          aria-label="Следующее изображение"
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <Box className="product-detail-page__gallery-dots">
          {images.map((image, index) => (
            <GalleryDot
              key={`dot-${image}`}
              isActive={index === currentIndex}
              onClick={() => goTo(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
