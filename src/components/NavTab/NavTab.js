import logo from '../../images/logo.svg';

function NavTab() {
  return(
    <nav className="nav">
      <img className="nav__logo" alt="Логотип" src={logo} />
      <div className="nav__buttons">
        <button className="nav__signup-button">Регистрация</button>
        <button className="nav__signin-button">Войти</button>
      </div>
    </nav>
  )
}

export default NavTab;
