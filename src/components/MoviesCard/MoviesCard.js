import cardImage from '../../images/card-image.svg';

function MoviesCard() {
  // const isLiked = props.card.likes.some(like => like === currentUser._id);

  return(
    <li className="movies-card">
      <img src={cardImage} alt="#" className="movies-card__image"/>
      <div className="movies-card__like-block">
        <h2 className="movies-card__title">Название фильма</h2>
        <button className="movies-card__like-button" type="button"></button>
      </div>
      <p className="movies-card__duration">1ч 47м</p>
    </li>
  )
}

export default MoviesCard;
