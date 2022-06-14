import { Component } from 'react';
import Scroll from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import api from '../../services/image-api';
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

  componentDidUpdate(_, prevState) {
    const prevImgName = prevState.imageName;
    const nextImgName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImgName !== nextImgName) {
      this.setState({ status: Status.PENDING });
      api
        .fetchImages(nextImgName, nextPage)
        .then(({ hits }) => {
          return this.setState({ images: hits, status: Status.RESOLVED });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (prevPage !== nextPage && prevImgName === nextImgName) {
      this.setState({ status: Status.PENDING });
      api
        .fetchImages(nextImgName, nextPage)
        .then(({ hits }) =>
          this.setState({
            images: [...prevState.images, ...hits],
            status: Status.RESOLVED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1 });
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

    if (status === Status.IDLE) {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </div>
      );
    }

    if (status === Status.PENDING) {
      return <Loader />;
    }

    if (status === Status.REJECTED) {
      return <div>{error.message}</div>;
    }

    if (status === Status.RESOLVED) {
      return (
        <div className={s.app}>
          <ToastContainer />
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onItemClick={this.handleImgClick} />
          <Button onClick={this.handleButtonClick} />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={src} alt={alt} width="600" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

export default App;
