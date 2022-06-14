import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import api from '../../services/image-api';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const KEY = '13787357-0d618ee77456142b0c554f1c2';
class ImageGallery extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    error: null,
  };

  componentDidUpdate(prevProps, _) {
    const prevImgName = prevProps.imageName;
    const nextImgName = this.props.imageName;

    if (prevImgName !== nextImgName) {
      this.setState({ status: Status.PENDING });
      api
        .fetchImages(nextImgName)
        .then(({ hits }) =>
          this.setState({ images: hits, status: Status.RESOLVED })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { images, status, error } = this.state;

    if (status === Status.PENDING) {
      return <Loader />;
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ul className={s.gallery}>
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem key={id} src={webformatURL} alt={tags} />
            ))}
          </ul>
          <Button />
        </>
      );
    }

    if (status === Status.REJECTED) {
      return <div>{error.message}</div>;
    }
  }
}

export default ImageGallery;
