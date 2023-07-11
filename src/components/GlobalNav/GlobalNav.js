import logo from '../../images/logo.svg';

function GlobalNav() {
  return(
    <nav className="global-nav">
      <img className="global-nav__logo" alt="Логотип" src={logo} />
      <div className="global-nav__buttons">
        <button className="global-nav__movies-button">Фильмы</button>
        <button className="global-nav__saved-movies-button">Сохраненные фильмы</button>
      </div>
      <button className='global-nav__account-button'>Акккаунт</button>
    </nav>
  )
}

export default GlobalNav;
