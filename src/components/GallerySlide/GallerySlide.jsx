import { Box } from '@mui/material';

/**
 * Get CSS class for slide based on its position relative to current
 * @param {number} index - Slide index
 * @param {number} currentIndex - Current visible slide index
 * @param {number} total - Total number of slides
 * @returns {string} CSS class suffix
 */
function getSlidePositionClass(index, currentIndex, total) {
  if (index === currentIndex) return 'active';
  if (index === (currentIndex - 1 + total) % total) return 'prev';
  if (index === (currentIndex + 1) % total) return 'next';
  return '';
}

/**
 * Individual gallery slide component
 * @param {Object} props
 * @param {string} props.image - Image URL
 * @param {string} props.alt - Image alt text
 * @param {number} props.index - Slide index
 * @param {number} props.currentIndex - Current visible slide index
 * @param {number} props.total - Total number of slides
 * @param {string} props.direction - Animation direction ('next' or 'prev')
 */
export function GallerySlide({ image, alt, index, currentIndex, total, direction }) {
  const positionClass = getSlidePositionClass(index, currentIndex, total);
  const directionClass = direction === 'next' ? 'slide-direction-next' : 'slide-direction-prev';

  return (
    <Box
      className={`product-detail-page__gallery-slide product-detail-page__gallery-slide--${positionClass} ${directionClass}`}
    >
      <img
        src={image}
        alt={alt}
        className="product-detail-page__gallery-image"
      />
    </Box>
  );
}
