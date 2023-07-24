import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';

function User(props) {
  const history = useHistory();
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const regName = /^[a-zа-яА-ЯЁё +-]+$/gi;
  const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  function handleLogoClick() {
    history.push('/');
  }

  useEffect(() => {
    if (props.conflictError) {
      setEmailError('Пользователь с такой почтой уже существует');
    } else {
      setEmailError('');
    }
  }, [props.conflictError])

  function handleInput(evt) {
    switch(evt.target.name) {
      case 'name':
        if(!regName.test(nameValue)) {
          setNameError('Имя может содержать только латиницу, кириллицу, пробел или дефис.');
          evt.target.classList.add('user-form__input-error')
        } else {
          setNameError('');
          evt.target.classList.remove('user-form__input-error')
        }
        if(evt.target.validationMessage) {
          setNameError(evt.target.validationMessage);
        }
        setNameValue(evt.target.value);
        break;
      case 'email':
        setEmailValue(evt.target.value);
        if(evt.target.validationMessage) {
          setEmailError(evt.target.validationMessage);
        } else {
          setEmailError('');
        }
        if(!regEmail.test(emailValue)) {
          setEmailError('Некорректный адрес электронной почты');
          evt.target.classList.add('user-form__input-error')
        } else {
          setNameError('');
          evt.target.classList.remove('user-form__input-error')
        }
        break;
      case 'password':
        setPasswordValue(evt.target.value);
        if(evt.target.validationMessage) {
          setPasswordError(evt.target.validationMessage);
        } else {
          setPasswordError('');
        }
        break;
      default:
    }
  }

  function handleSubmit(evt) {
    const formData = {email: emailValue, password: passwordValue};
    evt.preventDefault();
    if(props.page === 'register') {
      formData.name = nameValue;
    }
    if((!emailError && !passwordError && !nameError) && (emailValue && passwordValue && (nameValue || props.page === 'login'))){
      props.submitHandler(formData);
    }
  }

  return(
    <main className='user'>
      <img src={logo} alt="Логотип" className="user__logo" onClick={handleLogoClick}/>
      {props.page === 'register'
        ? <h1 className="user__title">Добро пожаловать!</h1>
        : <h1 className="user__title">Рады видеть!</h1>
      }
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        {props.page === 'register' &&
          <>
            <label htmlFor='user-form__input-name' className='user-form__label'>Имя</label>
            <input type='name' id='user-form__input-name' name='name' className='user-form__input' required onChange={handleInput} minLength='3' maxLength='20'></input>
            <div className='user-form__error-container'>
              <span className='user-form__error-message'>{nameError}</span>
            </div>
          </>
        }
        <label htmlFor='user-form__input-email' className='user-form__label'>E-mail</label>
        <input type='email' id='user-form__input-email' name='email' className='user-form__input' required onChange={handleInput}></input>
        <div className='user-form__error-container'>
          <span className='user-form__error-message'>{emailError}</span>
        </div>
        <label htmlFor='user-form__input-password' className='user-form__label'>Пароль</label>
        <input type='password' id='user-form__input-password' autoComplete='on' name='password' className='user-form__input' required onChange={handleInput} minLength='5' maxLength='30'></input>
        <div className='user-form__error-container'>
          <span className='user-form__error-message'>{passwordError}</span>
        </div>
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
