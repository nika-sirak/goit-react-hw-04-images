import { Component } from 'react';
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

class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: Status.IDLE,
    error: null,
    page: 1,
    showModal: false,
    modalImg: {},
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ status: Status.PENDING });
      try {
        const images = await fetchImages(imageName, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: Status.RESOLVED,
        }));
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
      }
    }
  }
  handleFormSubmit = imageName => {
    this.setState({ imageName });
    this.resetImgGallery();
  };

  resetImgGallery = () => {
    this.setState({ page: 1, images: [] });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImgClick = (src, alt) => {
    this.toggleModal();
    this.setState({ modalImg: { src, alt } });
  };

  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    scroll.scrollToBottom();
  };

  render() {
    const { images, status, error, showModal, modalImg } = this.state;
    const { src, alt } = modalImg;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />

        {status === Status.PENDING && (
          <>
            <ImageGallery images={images} onItemClick={this.handleImgClick} />
            <Loader />
          </>
        )}

        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={images} onItemClick={this.handleImgClick} />
            <Button onClick={this.handleButtonClick} />
            {showModal && (
              <Modal onClose={this.toggleModal} src={src} alt={alt} />
            )}
          </>
        )}

        {status === Status.REJECTED && <div>{error.message}</div>}
      </div>
    );
  }
}

export default App;
