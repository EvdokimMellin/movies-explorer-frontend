import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  function MoreMoviesButton() {
    return props.page === 'movies'
      ? <button className="movies-cards__more-movies-button">Ещё</button>
      : <></>
  }

  return(
    <section className="movies-cards">
      <Preloader isLoading={props.isLoading} />
      <ul className="movies-cards__list">
        {
          props.cards.map(cardElement => {
            return(<MoviesCard key={cardElement.id || cardElement.movieId} page={props.page} movieData={cardElement} title={cardElement.nameRU} duration={`${(cardElement.duration/60 >= 1) ? `${Math.floor(cardElement.duration/60)}ч` : ''} ${cardElement.duration%60}м`} image={cardElement.image.url ? `https://api.nomoreparties.co${cardElement.image.url}` : cardElement.image} likeHandler={props.handleSaveMovie} deleteHandler={props.handleDeleteMovie} moviesList={props.moviesList} />)
          })
        }
      </ul>
      <MoreMoviesButton />
    </section>
  )
}

export default MoviesCardList;
