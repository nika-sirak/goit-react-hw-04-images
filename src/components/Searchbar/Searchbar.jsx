import { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      return toast.warning('Please, add some words');
    }
    this.props.onSubmit(this.state.imageName);
    this.resetForm(e);
  };

  resetForm = () => {
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchButton}>
            <span className={s.searchButtonLabel}>
              <FcSearch className={s.searchButtonSvg} />
            </span>
          </button>

          <input
            className={s.searchInput}
            onChange={this.handleNameChange}
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
