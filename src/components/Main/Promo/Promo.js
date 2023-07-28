import promoImageDesktop from '../../../images/promo-image-desktop.svg';
import promoImageTable from '../../../images/promo-image-table.svg';
import promoImagePhone from '../../../images/promo-image-phone.svg'

function Promo() {
  return(
    <header className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__image-desktop" alt="Картинка" src={promoImageDesktop} />
      <img className="promo__image-tablet" alt="Картинка" src={promoImageTable} />
      <img className="promo__image-phone" alt="Картинка" src={promoImagePhone} />
    </header>
  )
}

export default Promo;
