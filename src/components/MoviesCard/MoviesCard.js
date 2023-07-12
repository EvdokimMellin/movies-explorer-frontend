import cardImage from '../../images/card-image.svg';

function MoviesCard(props) {
  function handleLike(evt) {
    evt.target.classList.toggle('movies-card__like-button_active');
  }

  function handleDelete() {
    alert('Фильм убран из сохранённых');
  }

  return(
    <li className="movies-card">
      <img src={cardImage} alt="#" className="movies-card__image"/>
      <div className="movies-card__like-block">
        <h2 className="movies-card__title">Название фильма</h2>
        {props.page === 'movies'
          ? <button className="movies-card__like-button" type="button" onClick={handleLike}></button>
          : <button className="movies-card__delete-button" type="button" onClick={handleDelete}></button>
        }
      </div>
      <p className="movies-card__duration">1ч 47м</p>
    </li>
  )
}

export default MoviesCard;
