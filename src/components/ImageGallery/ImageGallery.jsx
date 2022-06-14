import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ images, onItemClick }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          onClick={() => onItemClick(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;

// class ImageGallery extends Component {
//   state = {
//     images: [],
//     status: Status.IDLE,
//     error: null,
//     page: 1,
//     showModal: false,
//     modalImg: {},
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevImgName = prevProps.imageName;
//     const nextImgName = this.props.imageName;

//     if (prevImgName !== nextImgName) {
//       this.setState({ status: Status.PENDING });
//       api
//         .fetchImages(nextImgName, this.state.page)
//         .then(({ hits }) => {
//           return this.setState({ images: hits, status: Status.RESOLVED });
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }

//     if (prevState.page !== this.state.page) {
//       this.setState({ status: Status.PENDING });
//       api
//         .fetchImages(nextImgName, this.state.page)
//         .then(({ hits }) =>
//           this.setState({
//             images: [...prevState.images, ...hits],
//             status: Status.RESOLVED,
//           })
//         )
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   handleImgClick = ({ src, alt }) => {
//     this.toggleModal();
//     this.setState({ modalImg: { src, alt } });
//   };

//   handleButtonClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     scroll.scrollToBottom();
//   };

//   render() {
//     const { images, status, error, showModal, modalImg } = this.state;
//     const { src, alt } = modalImg;
//     if (status === Status.PENDING) {
//       return <Loader />;
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <>
//           <ul className={s.gallery}>
//             {images.map(({ id, webformatURL, tags, largeImageURL }) => (
//               <ImageGalleryItem
//                 key={id}
//                 src={webformatURL}
//                 alt={tags}
//                 onClick={() =>
//                   this.handleImgClick({
//                     src: largeImageURL,
//                     alt: tags,
//                   })
//                 }
//               />
//             ))}
//           </ul>
//           <Button onClick={this.handleButtonClick} />
//           {showModal && (
//             <Modal onClose={this.toggleModal}>
//               <img src={src} alt={alt} width="600" />
//             </Modal>
//           )}
//         </>
//       );
//     }

//     if (status === Status.REJECTED) {
//       return <div>{error.message}</div>;
//     }
//   }
// }
