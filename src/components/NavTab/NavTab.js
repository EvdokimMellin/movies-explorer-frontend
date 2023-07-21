import logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';

function NavTab() {
  const history = useHistory();

  function handleLoginClick() {
    history.push('/signin');
  }
  function handleRegisterClick() {
    history.push('/signup');
  }
  function handleLogoClick() {
    history.push('/');
  }

  return(
    <nav className="nav">
      <img className="nav__logo" alt="Логотип" src={logo} onClick={handleLogoClick} />
      <div className="nav__buttons">
        <button className="nav__signup-button" onClick={handleRegisterClick}>Регистрация</button>
        <button className="nav__signin-button" onClick={handleLoginClick}>Войти</button>
      </div>
    </nav>
  )
}

export default NavTab;
