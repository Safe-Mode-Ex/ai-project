/**
 * Individual gallery dot component
 * @param {Object} props
 * @param {boolean} props.isActive - Whether this dot represents the current image
 * @param {Function} props.onClick - Click handler
 */
export function GalleryDot({ isActive, onClick }) {
  return (
    <button
      className={`product-detail-page__gallery-dot ${
        isActive ? 'product-detail-page__gallery-dot--active' : ''
      }`}
      onClick={onClick}
      aria-label={isActive ? 'Текущее изображение' : 'Перейти к изображению'}
    />
  );
}
