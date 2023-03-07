import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

import {
  SearchButton,
  InputForm,
  SearchLabel,
  SearchForm,
  SearchHeader,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (!input.trim()) {
      toast.error('Enter data in the search field!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    onSubmit(input);
  };

  const onChange = event => {
    setInput(event.currentTarget.value.toLowerCase());
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FaSearch />
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <InputForm
          onChange={onChange}
          value={input}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
