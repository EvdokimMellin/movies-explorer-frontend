import logo from '../../images/logo.svg';
import { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Menu from '../Menu/Menu';

function GlobalNav(props) {
  const history = useHistory();
  const [menuStatus, setMenuStatus] = useState(false);
  const [activePage, setActivePage] = useState(props.page);

  function handleMoviesClick() {
    history.push('/movies');
  }
  function handleSavedMoviesClick() {
    history.push('/saved-movies');
  }
  function handleProfileClick() {
    history.push('/profile');
  }
  function handleLogoClick() {
    history.push('/');
  }
  function menuOpenHandler() {
    setMenuStatus(true);
  }
  function menuCloseHandler() {
    setMenuStatus(false);
  }
  function changePageHandler() {
    if(activePage === 'movies') {
      setActivePage('saved-movies');
    } else {
      setActivePage('movies');
    }
  }

  return(
    <nav className={`global-nav ${activePage === 'main' && 'global-nav_page_main'}`}>
      <Menu isOpen={menuStatus} page={activePage} handleCloseMenu={menuCloseHandler} handleChangePage={changePageHandler}/>
      <img className="global-nav__logo" alt="Логотип" src={logo} onClick={handleLogoClick} />
      <div className="global-nav__buttons">
        <NavLink to='/movies' className="global-nav__link" onClick={handleMoviesClick}>Фильмы</NavLink>
        <NavLink to='/saved-movies' className="global-nav__link" onClick={handleSavedMoviesClick}>Сохраненные фильмы</NavLink>
      </div>
      <button className='global-nav__account-button' onClick={handleProfileClick}>Аккаунт</button>
      <button className={`global-nav__menu-button ${activePage === 'main' && 'global-nav__menu-button_main'}`} onClick={menuOpenHandler}></button>
    </nav>
  )
}

export default GlobalNav;
