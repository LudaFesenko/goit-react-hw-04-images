import { Component } from 'react';
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

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.input.trim()) {
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
    this.props.onSubmit(this.state.input);
  };

  onChange = event => {
    this.setState({ input: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FaSearch />
            <SearchLabel>Search</SearchLabel>
          </SearchButton>

          <InputForm
            onChange={this.onChange}
            value={this.state.input}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
