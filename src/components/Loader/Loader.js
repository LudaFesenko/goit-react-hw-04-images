import { ColorRing } from 'react-loader-spinner';

import { StyledLoader } from './Loader.styled';

function Loader() {
  return (
    <StyledLoader>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </StyledLoader>
  );
}

export default Loader;
