import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, alt, onClick }) {
  return (
    <li className={s.galleryItem} onClick={onClick}>
      <img className={s.galleryItemImage} src={src} alt={alt} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
