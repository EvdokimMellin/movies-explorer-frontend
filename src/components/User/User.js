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
    setEmailError('');
    setNameError('');
    setPasswordError('');
  }, [props.page]);

  useEffect(() => {
    if (props.conflictError) {
      setEmailError('Пользователь с такой почтой уже существует');
    } else {
      setEmailError('');
    }
  }, [props.conflictError]);

  useEffect(() => {
    if (props.unauthorizedError) {
      setPasswordError('Неверный E-mail или пароль');
    } else {
      setPasswordError('');
    }
  }, [props.unauthorizedError]);

  useEffect(() => {
    if(emailValue && !regEmail.test(emailValue)) {
      setEmailError('Некорректный адрес электронной почты');
    } else {
      emailError === 'Некорректный адрес электронной почты'
        && setEmailError('');
    }
  }, [emailValue])

  useEffect(() => {
    if(nameValue && !regName.test(nameValue)) {
      setNameError('Имя может содержать только латиницу, кириллицу, пробел или дефис.');
    } else {
      nameError === 'Имя может содержать только латиницу, кириллицу, пробел или дефис.'
        && setNameError('');
    }
  }, [nameValue])

  function handleInput(evt) {
    props.setConflictError(false);
    props.setUnauthorizedError(false);
    switch(evt.target.name) {
      case 'name':
        setNameValue(evt.target.value);
        if(evt.target.validationMessage) {
          setNameError(evt.target.validationMessage);
        } else {
          nameError !== 'Имя может содержать только латиницу, кириллицу, пробел или дефис.'
            && setNameError('');
        }
        break;
      case 'email':
        setEmailValue(evt.target.value);
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

  function checkInvalidity () {
    if(props.page === 'register') {
      if (nameError || emailError || passwordError || !nameValue || !emailValue || !passwordValue) {
        return true;
      } else {
        return false;
      }
    } else {
      if (emailError || passwordError || !emailValue || !passwordValue) {
        return true;
      } else {
        return false;
      }
    }
  }

  function handleSubmit(evt) {
    const formData = {email: emailValue, password: passwordValue};
    evt.preventDefault();
    if(props.page === 'register') {
      formData.name = nameValue;
    }
    if(!checkInvalidity()) {
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
            <input type='name' id='user-form__input-name' name='name' className={`user-form__input ${nameError && 'user-form__input-error'}`} required onChange={handleInput} minLength='2' maxLength='30'></input>
            <div className='user-form__error-container'>
              <span className='user-form__error-message'>{nameError}</span>
            </div>
          </>
        }
        <label htmlFor='user-form__input-email' className='user-form__label'>E-mail</label>
        <input type='email' id='user-form__input-email' name='email' className={`user-form__input ${emailError && 'user-form__input-error'}`} required onChange={handleInput}></input>
        <div className='user-form__error-container'>
          <span className='user-form__error-message'>{emailError}</span>
        </div>
        <label htmlFor='user-form__input-password' className='user-form__label'>Пароль</label>
        <input type='password' id='user-form__input-password' autoComplete='on' name='password' className={`user-form__input ${passwordError && 'user-form__input-error'}`} required onChange={handleInput} minLength='5' maxLength='30'></input>
        <div className='user-form__error-container'>
          <span className='user-form__error-message'>{passwordError}</span>
        </div>
        {props.page === 'register'
          ? <>
              <button type='submit' className={`user-form__submit-button ${checkInvalidity() && 'user-form__submit-button_disabled'}`}>Зарегистрироваться</button>
              <p className='user-form__link-text'>Уже зарегистрированы? <Link to='/signin' className='user-form__link'>Войти</Link></p>
            </>
          : <>
              <button type='submit' className={`user-form__submit-button ${checkInvalidity() && 'user-form__submit-button_disabled'} ${props.page === 'login' && 'login-button'}`}>Войти</button>
              <p className='user-form__link-text'>Ещё не зарегистрированы? <Link to='/signup' className='user-form__link'>Регистрация</Link></p>
            </>
        }
      </form>
    </main>
  )
}

export default User;
