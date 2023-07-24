import React, {useState} from 'react';
import searchIconGrey from '../../images/search-icon-grey.svg';
import searchIconWhite from '../../images/search-icon-white.svg';

function SearchForm(props) {
  const [inputValue, setInputValue] = useState('');
  const isChecked = props.onlyShortMovies;

  function searchSwitch(e) {
    props.checkboxClickHandler(!props.onlyShortMovies);
  }

  function handleInput(evt) {
    setInputValue(evt.target.value);
  }

  function handleSearch(evt) {
    evt.preventDefault();
    props.searchHandler(inputValue);
  }

  return(
    <section className="search">
      <div className="search__content">
        <img src={searchIconGrey} alt="Поиск" className="search__icon" />
        <form className="search__form" onSubmit={handleSearch} name="search-form">
          <input type="text" placeholder="Фильм" className="search__textarea" required minLength='3' maxLength='30' onChange={handleInput} name="search-input" />
          <button type="submit" className="search__button">
            <img src={searchIconWhite} alt="Найти" />
          </button>
        </form>
        <button className={`search__switch-button ${!isChecked && 'search__switch-off'}`} onClick={searchSwitch}></button>
        <p className="search__switch-text">Короткометражки</p>
      </div>
      <div className='search__switch-container'>
        <button className="search__switch-button small-screen" onClick={searchSwitch}></button>
        <p className="search__switch-text small-screen">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm;
