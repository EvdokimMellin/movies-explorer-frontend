import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  function MoreMoviesButton() {
    return props.page === 'movies'
      ? <button className="movies-cards__more-movies-button">Ещё</button>
      : <></>
  }

  return(
    <section className="movies-cards">
      <ul className="movies-cards__list">
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
        <MoviesCard page={props.page} />
      </ul>
      <MoreMoviesButton />
    </section>
  )
}

export default MoviesCardList;
