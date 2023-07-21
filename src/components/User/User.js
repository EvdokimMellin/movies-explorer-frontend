import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';

function User(props) {
  const history = useHistory();

  function handleLogoClick() {
    history.push('/');
  }

  return(
    <main className='user'>
      <img src={logo} alt="Логотип" className="user__logo" onClick={handleLogoClick}/>
      {props.page === 'register'
        ? <h1 className="user__title">Добро пожаловать!</h1>
        : <h1 className="user__title">Рады видеть!</h1>
      }
      <form className="user-form">
        {props.page === 'register' &&
          <>
            <label htmlFor='user-form__input-name' className='user-form__label'>Имя</label>
            <input type='name' id='user-form__input-name' name='name' className='user-form__input' required></input>
          </>
        }
        <label htmlFor='user-form__input-email' className='user-form__label'>E-mail</label>
        <input type='email' id='user-form__input-email' name='email' className='user-form__input' required></input>
        <label htmlFor='user-form__input-password' className='user-form__label'>Пароль</label>
        <input type='password' id='user-form__input-password' autoComplete='on' name='password' className='user-form__input' required></input>
        {props.page === 'register'
          ? <>
              <button type='submit' className='user-form__submit-button'>Зарегистрироваться</button>
              <p className='user-form__link-text'>Уже зарегистрированы? <Link to='/signin' className='user-form__link'>Войти</Link></p>
            </>
          : <>
              <button type='submit' className={`user-form__submit-button ${props.page === 'login' && 'login-button'}`}>Войти</button>
              <p className='user-form__link-text'>Ещё не зарегистрированы? <Link to='/signup' className='user-form__link'>Регистрация</Link></p>
            </>
        }
      </form>
    </main>
  )
}

export default User;
