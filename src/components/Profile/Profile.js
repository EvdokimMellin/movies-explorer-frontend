import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [nameValue, setNameValue] = useState(currentUser.name);
  const [nameError, setNameError] = useState('');
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [emailError, setEmailError] = useState('');
  const regName = /^[a-zа-яА-ЯЁё +-]+$/gi;
  const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  function handleLogout() {
    props.logoutHandler();
  }
  function handleEdit(evt) {
    evt.preventDefault();
    (!nameError && !emailError) && props.editProfileHandler(nameValue, emailValue)
  }
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
      default:
    }
  }

  return(
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' onSubmit={handleEdit}>
        <div className='profile__element'>
          <p className='profile__element-key'>Имя</p>
          <div className='profile__input-container'>
            <input type='name' className='profile__element-value' name='name' onChange={handleInput} placeholder={currentUser.name}></input>
            <div className='profile__error-container'>
              <span className='user-form__error-message'>{nameError}</span>
            </div>
          </div>
        </div>
        <div className='profile__element'>
          <p className='profile__element-key'>E-mail</p>
          <div className='profile__input-container'>
            <input type='email' className='profile__element-value' name='email' onChange={handleInput} placeholder={currentUser.email}></input>
            <div className='profile__error-container'>
              <span className='user-form__error-message'>{emailError}</span>
            </div>
          </div>
        </div>
        <button className='profile__edit-button'>Редактировать</button>
      </form>
      <button className='profile__logout-button' onClick={handleLogout}>Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;
