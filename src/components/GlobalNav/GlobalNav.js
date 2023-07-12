import logo from '../../images/logo.svg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    <nav className="global-nav">
      <Menu isOpen={menuStatus} page={activePage} handleCloseMenu={menuCloseHandler} handleChangePage={changePageHandler}/>
      <img className="global-nav__logo" alt="Логотип" src={logo} onClick={handleLogoClick} />
      <div className="global-nav__buttons">
        <button className="global-nav__movies-button" onClick={handleMoviesClick}>Фильмы</button>
        <button className="global-nav__saved-movies-button" onClick={handleSavedMoviesClick}>Сохраненные фильмы</button>
      </div>
      <button className='global-nav__account-button' onClick={handleProfileClick}>Акккаунт</button>
      <button className='global-nav__menu-button' onClick={menuOpenHandler}></button>
    </nav>
  )
}

export default GlobalNav;
