import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import s from './Modal.module.css';

function Modal({ onClose, src, alt }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleImgLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt={alt} width="700" onLoad={handleImgLoaded} />
        {!loaded && <Loader />}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
