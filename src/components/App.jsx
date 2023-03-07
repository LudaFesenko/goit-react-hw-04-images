import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { fetchImages, PER_PAGE } from '../api';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalAlt, setModalAlt] = useState('');
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      if (!searchString) {
        return;
      }

      try {
        setStatus('loading');

        const response = await fetchImages(searchString, page);

        if (!response.hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setImages([]);
          setCanLoadMore(false);

          return;
        }

        if (page === 1) {
          toast.info(`Hooray! We found ${response.totalHits} images`);
        }

        const maxPage = response.totalHits / PER_PAGE;

        setImages(prevState => [...prevState, ...response.hits]);

        setCanLoadMore(page < maxPage);
      } catch (error) {
        setStatus('error');
      } finally {
        setStatus('idle');
      }
    };

    loadImages();
  }, [searchString, page]);

  const setNewSearch = query => {
    if (status === 'loading') {
      return;
    }

    setSearchString(query);
    setPage(1);
    setImages([]);
    setCanLoadMore(false);
  };

  const handleClickImg = ({ target: { alt, dataset } }) => {
    setShowModal(true);
    setModalImg(dataset.src);
    setModalAlt(alt);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const loadNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg} alt={modalAlt} />
        </Modal>
      )}
      <Searchbar onSubmit={setNewSearch} />
      <ImageGallery images={images} onClickImg={handleClickImg} />
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
      {canLoadMore && status !== 'loading' && <Button onClick={loadNextPage} />}
    </Container>
  );
};
