import React from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Menu(props) {
  const history = useHistory();

  function handleProfileClick() {
    history.push('/profile');
  }

  function handleCloseMenu() {
    props.handleCloseMenu();
  }
  function handleChangePage(evt) {
    if (!evt.target.classList.contains('menu__link_active')) {
      props.handleChangePage();
    }
  }

    return (
        <div className={`menu ${props.isOpen ? 'menu_active' : ''}`}>
          <nav className='menu__nav'>
            <button className='menu__close-button' onClick={handleCloseMenu}></button>
            <NavLink to='/' className={`menu__link ${props.page === 'main' && 'menu__link_active'}`}>Главная</NavLink>
            <NavLink to='/movies' className={`menu__link ${props.page === 'movies' && 'menu__link_active'}`} onClick={handleChangePage}>Фильмы</NavLink>
            <NavLink to='/saved-movies' className={`menu__link ${props.page === 'saved-movies' && 'menu__link_active'}`} onClick={handleChangePage}>Сохранённые фильмы</NavLink>
            <button className='menu__profile-button' onClick={handleProfileClick}>Аккаунт</button>
          </nav>
        </div>
    )
}

export default Menu
