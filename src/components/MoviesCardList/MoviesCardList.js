import React, {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  desktopCardsLock, tabletCardsLock, phoneCardsLock, changeDesktopCardsLock, changeSmallScreenCardsLock, desktopResolution, tabletResolution
} from "../../utils/constants";

function MoviesCardList(props) {
  const pageWidth = document.documentElement.scrollWidth;

  const [cardsLock, setCardsLock] = useState(desktopCardsLock);

  const allCards = props.page === 'saved-movies'
    ? (props.addedMovies.length !== 0 ? props.cards.concat(props.addedMovies)
        .filter((card) => {
          return !props.moviesForDelete.find((delId) => {
            return card._id === delId;
          })
        }) : props.cards)
    : props.cards;
  const allMoviesList = props.moviesList.concat(props.addedMovies)
    .filter((movie) => {
      return !props.moviesForDelete.find((delId) => {
        return movie._id === delId;
      })
    });

  const actualNotFound = props.addedMovies.length !== 0 ? false : props.notFound

  useEffect(() => {
    if (pageWidth < desktopResolution && pageWidth >= tabletResolution) {
      setCardsLock(tabletCardsLock);
    } else if (pageWidth < tabletResolution) {      setCardsLock(phoneCardsLock)
    } else {
      setCardsLock(desktopCardsLock)
    }
  }, []);

  function handleMoreMovies() {
    if (pageWidth >= desktopResolution) {
      setCardsLock(cardsLock + changeDesktopCardsLock);
    } else {
      setCardsLock(cardsLock + changeSmallScreenCardsLock);
    }
    // console.log(props.moviesForDelete);
    // console.log(allCards);
    // console.log(allMoviesList);
  }

  function MoreMoviesButton() {
    return (allCards.length > cardsLock)
    // return true
      ? <button className="movies-cards__more-movies-button" onClick={handleMoreMovies}>Ещё</button>
      : <></>
  }

  return(
    <section className="movies-cards">
      <Preloader isLoading={props.isLoading} notFound={actualNotFound} movies={props.movies} />
      <ul className="movies-cards__list">
        {
          allCards.slice(0, cardsLock).map(cardElement => {
            return(<MoviesCard key={cardElement.id || cardElement.movieId} page={props.page} movieData={cardElement} title={cardElement.nameRU} duration={`${(cardElement.duration/60 >= 1) ? `${Math.floor(cardElement.duration/60)}ч` : ''} ${cardElement.duration%60}м`} image={cardElement.image.url ? `https://api.nomoreparties.co${cardElement.image.url}` : cardElement.image} likeHandler={props.handleSaveMovie} deleteHandler={props.handleDeleteMovie} moviesList={allMoviesList} addedMovies={props.addedMovies} />)
          })
        }
      </ul>
      <MoreMoviesButton />
    </section>
  )
}

export default MoviesCardList;
