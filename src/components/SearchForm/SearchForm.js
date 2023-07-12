import searchIconGrey from '../../images/search-icon-grey.svg';
import searchIconWhite from '../../images/search-icon-white.svg';

function SearchForm() {
  function searchSwitch(e) {
    e.target.classList.toggle('search__switch-off')
  }

  return(
    <section className="search">
      <div className="search__content">
        <img src={searchIconGrey} alt="Поиск" className="search__icon" />
        <form className="search__form">
          <input type="text" placeholder="Фильм" className="search__textarea" />
          <button type="submit" className="search__button">
            <img src={searchIconWhite} alt="Найти" />
          </button>
        </form>
        <button className="search__switch-button" onClick={searchSwitch}></button>
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
