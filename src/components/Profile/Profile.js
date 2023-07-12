import React from 'react';

function Profile(props) {
  function handleLogout() {
    alert('Вы вышли из аккаунта');
  }
  function handleEdit() {
    alert('Вы можете отредактировать свой профиль');
  }
  return(
    <main className='profile'>
      <h1 className='profile__title'>Привет, {props.user.name}!</h1>
      <div className='profile__element'>
        <p className='profile__element-key'>Имя</p>
        <p className='profile__element-value'>{props.user.name}</p>
      </div>
      <div className='profile__element'>
        <p className='profile__element-key'>E-mail</p>
        <p className='profile__element-value'>{props.user.email}</p>
      </div>
      <button className='profile__edit-button' onClick={handleEdit}>Редактировать</button>
      <button className='profile__logout-button' onClick={handleLogout}>Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;
