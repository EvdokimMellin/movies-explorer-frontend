import React, { useEffect, useState, useRef } from 'react';
import searchIconGrey from '../../images/search-icon-grey.svg';
import searchIconWhite from '../../images/search-icon-white.svg';

function SearchForm(props) {
  const [inputValue, setInputValue] = useState(((localStorage.getItem('keyWord') !== 'null') && props.page !== 'saved-movies') ? localStorage.getItem('keyWord') : '');
  const [inputError, setInputError] = useState(false);
  const isChecked = props.onlyShortMovies;
  const searchInput = useRef();

  useEffect(() => {
    searchInput.current.setAttribute('value', props.searchData);
  }, [props.searchData])

  useEffect(() => {
    props.isLoading ? searchInput.current.setAttribute('readonly', 'readonly') : searchInput.current.removeAttribute('readonly');
  }, [props.isLoading])

  function searchSwitch(e) {
    props.checkboxClickHandler(!props.onlyShortMovies);
    localStorage.setItem('onlyShortMovies', `${!props.onlyShortMovies}`);
  }

  function handleInput(evt) {
    setInputValue(evt.target.value);
    setInputError(false)
  }

  function handleSearch(evt) {
    evt.preventDefault();
    if (searchInput.current.value === '') {
      setInputError(true)
    } else {
      !props.isLoading && props.searchHandler(inputValue);
    }
  }

  return(
    <section className="search">
      <div className="search__content">
        <img src={searchIconGrey} alt="Поиск" className="search__icon" />
        <form className="search__form" onSubmit={handleSearch} name="search-form" noValidate>
          <input ref={searchInput} type="text" placeholder="Фильм" className="search__textarea" onChange={handleInput} name="search-input" required />
          <button type="submit" className="search__button">
            <img src={searchIconWhite} alt="Найти" />
          </button>
        </form>
        <button className={`search__switch-button ${!isChecked && 'search__switch-off'}`} onClick={searchSwitch}></button>
        <p className="search__switch-text">Короткометражки</p>
      </div>
      <div className='search__switch-container'>
        <button className={`search__switch-button small-screen ${!isChecked && 'search__switch-off'}`} onClick={searchSwitch}></button>
        <p className="search__switch-text small-screen">Короткометражки</p>
      </div>
      <span className={`search__error ${inputError && 'search__error_active'}`}>Нужно ввести ключевое слово</span>
    </section>
  )
}

export default SearchForm;
