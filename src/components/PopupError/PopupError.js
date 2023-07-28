import React, {useState, useEffect} from "react"

export default function PopupError(props) {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  useEffect(() => {
    props.serverError !== '' ? setIsPopupOpened(true) : setIsPopupOpened(false)
  }, [props.serverError])

  function closePopup(evt) {
    (evt.target.classList.contains('error-popup') || evt.target.classList.contains('error-popup__button'))
      && props.setServerError('')
  }

  return(
    <div className={`error-popup ${isPopupOpened && 'error-popup_opened'}`} onClick={closePopup}>
      <div className='error-popup__container'>
        <p className='error-popup__message'>{props.serverError !== 'Ошибка: 400' ? `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз. ${props.serverError}` : 'Проверьте правильность введенных данных'}</p>
        <button className='error-popup__button' onClick={closePopup}>Ок</button>
      </div>
    </div>
  )
}
