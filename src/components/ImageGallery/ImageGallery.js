import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

const ImageGallery = ({ images, onClickImg }) => {
  if (!images.length) {
    return null;
  }

  return (
    <ImageList>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          dataSrc={largeImageURL}
          alt={tags}
          onClickImg={onClickImg}
        />
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
