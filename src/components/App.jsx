import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { fetchImages, PER_PAGE } from '../api';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

export class App extends Component {
  state = {
    status: 'idle',
    searchString: '',
    page: 1,
    images: [],
    canLoadMore: false,

    showModal: false,
    modalAlt: '',
    modalImg: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchString !== prevState.searchString ||
      this.state.page !== prevState.page
    ) {
      this.loadImages();
    }
  }

  setNewSearch = searchString => {
    this.setState({
      searchString,
      page: 1,
      images: [],
      canLoadMore: false,
    });
  };

  loadImages = async () => {
    if (this.state.status === 'loading') {
      return;
    }

    const { searchString, page, images } = this.state;

    try {
      this.setState({ status: 'loading' });

      const response = await fetchImages(searchString, page);

      if (!response.hits.length) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        this.setState({ images: [], canLoadMore: false });
        return;
      }

      if (page === 1) {
        toast.info(`Hooray! We found ${response.totalHits} images`);
      }

      const maxPage = response.totalHits / PER_PAGE;

      this.setState({
        images: [...images, ...response.hits],
        canLoadMore: page < maxPage,
      });
    } catch (error) {
      this.setState({ status: 'error' });
    } finally {
      this.setState({ status: 'idle' });
    }
  };

  handleClickImg = ({ target: { alt, dataset } }) => {
    this.setState({
      showModal: true,
      modalImg: dataset.src,
      modalAlt: alt,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loadNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, status, canLoadMore, showModal, modalImg, modalAlt } =
      this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        <Searchbar onSubmit={this.setNewSearch} />
        <ImageGallery images={images} onClickImg={this.handleClickImg} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {status === 'loading' && <Loader />}
        {canLoadMore && status !== 'loading' && (
          <Button onClick={this.loadNextPage} />
        )}
      </Container>
    );
  }
}
