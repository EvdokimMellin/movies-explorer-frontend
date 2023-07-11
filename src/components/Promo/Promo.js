import promoImage from '../../images/promo-image.svg'

function Promo() {
  return(
    <header className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
      <img className="promo__image" alt="Картинка" src={promoImage} />
    </header>
  )
}

export default Promo;
