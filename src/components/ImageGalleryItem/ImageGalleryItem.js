import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ src, tags, dataSrc, onClickImg }) => {
  return (
    <Item>
      <Image src={src} alt={tags} data-src={dataSrc} onClick={onClickImg} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
}.isRequired;

export default ImageGalleryItem;
