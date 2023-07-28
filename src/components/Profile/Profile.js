import React, { useContext, useState, useEffect, useRef } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [nameValue, setNameValue] = useState(currentUser.name);
  const [nameError, setNameError] = useState('');
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [emailError, setEmailError] = useState('');
  const nameInput = useRef();
  const emailInput = useRef();
  const regName = /^[a-zа-яА-ЯЁё +-]+$/gi;
  const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  useEffect(() => {
    nameInput.current.setAttribute('value', currentUser.name)
    emailInput.current.setAttribute('value', currentUser.email)
  }, [currentUser])

  useEffect(() => {
    if(props.onRequest) {
      nameInput.current.setAttribute('readonly', 'readonly');
      emailInput.current.setAttribute('readonly', 'readonly');
    } else {
      nameInput.current.removeAttribute('readonly');
      emailInput.current.removeAttribute('readonly');
    }
  }, [props.onRequest])

  useEffect(() => {
    if (props.conflictError) {
      setEmailError('Пользователь с такой почтой уже существует');
    } else {
      setEmailError('');
    }
  }, [props.conflictError]);

  useEffect(() => {
    if(emailValue && emailValue !== currentUser.email && !regEmail.test(emailValue)) {
      setEmailError('Некорректный адрес электронной почты');
    } else {
      emailError === 'Некорректный адрес электронной почты'
        && setEmailError('');
    }
  }, [emailValue])

  useEffect(() => {
    if(nameValue  && nameValue !== currentUser.name && !regName.test(nameValue)) {
      setNameError('Имя может содержать только латиницу, кириллицу, пробел или дефис.');
    } else {
      nameError === 'Имя может содержать только латиницу, кириллицу, пробел или дефис.'
        && setNameError('');
    }
  }, [nameValue])

  function handleLogout() {
    props.logoutHandler();
  }

  function handleEdit(evt) {
    evt.preventDefault();
    !checkInvalidity() && props.editProfileHandler(nameValue, emailValue)
  }

  function handleInput(evt) {
    props.setConflictError(false);
    switch(evt.target.name) {
      case 'name':
        if(evt.target.validationMessage) {
          setNameError(evt.target.validationMessage);
        } else {
          setNameError('');
        }
        setNameValue(evt.target.value);
        break;
      case 'email':
        setEmailValue(evt.target.value);
        break;
      default:
    }
  }

  function checkInvalidity () {
    if (nameError || emailError
      || (!nameValue && (!emailValue || emailValue === currentUser.email))
      || ((nameValue === currentUser.name) && (!emailValue || emailValue === currentUser.email))
      || ((emailValue === currentUser.email) && (!nameValue || nameValue === currentUser.name))
      || (!emailValue && (!nameValue || nameValue === currentUser.name))) {
      return true;
    } else {
      return false;
    }
  }

  function closePopup(evt) {
    (evt.target.classList.contains('success-popup') || evt.target.classList.contains('success-popup__button'))
      && props.setIsPopupOpened(false)
  }

  function SuccessPopup() {
    return(
      <div className={`success-popup ${props.isPopupOpened && 'success-popup_opened'}`} onClick={closePopup}>
        <div className='success-popup__container'>
          <p className='success-popup__message'>Профиль изменён</p>
          <button className='success-popup__button' onClick={closePopup}>Ок</button>
        </div>
      </div>
    )
  }

  return(
    <>
      <SuccessPopup />
      <main className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' onSubmit={handleEdit} noValidate>
          <div className='profile__element'>
            <p className='profile__element-key'>Имя</p>
            <div className='profile__input-container'>
              <input type='name' className='profile__element-value' name='name' onChange={handleInput} minLength='2' maxLength='30' ref={nameInput}></input>
              <div className='profile__error-container'>
                <span className='user-form__error-message'>{nameError}</span>
              </div>
            </div>
          </div>
          <div className='profile__element'>
            <p className='profile__element-key'>E-mail</p>
            <div className='profile__input-container'>
              <input type='email' className='profile__element-value' name='email' ref={emailInput} onChange={handleInput}></input>
              <div className='profile__error-container'>
                <span className='user-form__error-message'>{emailError}</span>
              </div>
            </div>
          </div>
          <button className={`profile__edit-button ${(checkInvalidity() || props.onRequest) && 'profile__edit-button_disabled'}`}>Редактировать</button>
        </form>
        <button className='profile__logout-button' onClick={handleLogout}>Выйти из аккаунта</button>
      </main>
    </>
  )
}

export default Profile;
