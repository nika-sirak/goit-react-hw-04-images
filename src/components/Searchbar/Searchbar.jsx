import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      return toast.warning('Please, add some words');
    }

    onSubmit(imageName);
    resetForm(e);
  };

  const resetForm = () => {
    setImageName('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchButton}>
          <span className={s.searchButtonLabel}>
            <FcSearch className={s.searchButtonSvg} />
          </span>
        </button>

        <input
          className={s.searchInput}
          onChange={handleNameChange}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
