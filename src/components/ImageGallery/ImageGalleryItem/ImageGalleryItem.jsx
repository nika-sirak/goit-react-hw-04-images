import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, alt }) {
  return (
    <li className={s.galleryItem}>
      <img className={s.galleryItemImage} src={src} alt={alt} />
    </li>
  );
}

export default ImageGalleryItem;
