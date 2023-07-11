import { Link, useHistory } from 'react-router-dom';
import React, {useState} from 'react';
import logo from '../../images/logo.svg';

function User(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();

  function handleChange (evt) {
    switch(evt.target.name) {
      case 'email':
        setEmail(evt.target.value);
        break;
      case 'password':
        setPassword(evt.target.value);
        break;
      case 'name':
        setName(evt.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.handleSubmit(email, password, name)
    // history.push('/sign-in')
  }

  return(
    <main className='user'>
      <img src={logo} alt="Логотип" className="user__logo"/>
      <h1 className="user__title">Добро пожаловать!</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor='user-form__input-name' className='user-form__label'>Имя</label>
        <input type='name' id='user-form__input-name' name='name' className='user-form__input' onChange={handleChange}></input>
        <label htmlFor='user-form__input-email' className='user-form__label'>E-mail</label>
        <input type='email' id='user-form__input-email' name='email' className='user-form__input' onChange={handleChange}></input>
        <label htmlFor='user-form__input-password' className='user-form__label'>Пароль</label>
        <input type='password' id='user-form__input-password' autoComplete='on' name='password' className='user-form__input' onChange={handleChange}></input>
        <button type='submit' className='user-form__submit-button'>Зарегистрироваться</button>
        <p className='user-form__link-text'>Уже зарегистрированы? <Link to='/signin' className='user-form__link'>Войти</Link></p>
      </form>
    </main>
  )
}

export default User;
