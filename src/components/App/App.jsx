import { useState, useEffect } from 'react';
import Scroll from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import fetchImages from '../../services/image-api';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const scroll = Scroll.animateScroll;

function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({});

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    const fetchData = async () => {
      setStatus(Status.PENDING);

      try {
        const pixaImgs = await fetchImages(imageName, page);

        setImages(prevState => [...prevState, ...pixaImgs]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };

    fetchData();
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    resetImgGallery();
  };

  const resetImgGallery = () => {
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleImgClick = (src, alt) => {
    toggleModal();
    setModalImg({ src, alt });
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
    scroll.scrollToBottom();
  };

  const { src, alt } = modalImg;

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer />

      {status === Status.PENDING && (
        <>
          <ImageGallery images={images} onItemClick={handleImgClick} />
          <Loader />
        </>
      )}

      {status === Status.RESOLVED && (
        <>
          <ImageGallery images={images} onItemClick={handleImgClick} />
          <Button onClick={handleButtonClick} />
          {showModal && <Modal onClose={toggleModal} src={src} alt={alt} />}
        </>
      )}

      {status === Status.REJECTED && <div>{error.message}</div>}
    </div>
  );
}

export default App;
