import React, {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  desktopCardsLock, tabletCardsLock, phoneCardsLock, changeDesktopCardsLock, changeSmallScreenCardsLock, desktopResolution, tabletResolution
} from "../../utils/constants";

function MoviesCardList(props) {
  const pageWidth = document.documentElement.scrollWidth;

  const [cardsLock, setCardsLock] = useState(desktopCardsLock);

  useEffect(() => {
    if (pageWidth < desktopResolution && pageWidth >= tabletResolution) {
      setCardsLock(tabletCardsLock);
    } else if (pageWidth < tabletResolution) {
      setCardsLock(phoneCardsLock)
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
  }

  function MoreMoviesButton() {
    return ((props.page === 'movies') && (props.cards.length > cardsLock))
      ? <button className="movies-cards__more-movies-button" onClick={handleMoreMovies}>Ещё</button>
      : <></>
  }

  return(
    <section className="movies-cards">
      <Preloader isLoading={props.isLoading} notFound={props.notFound} movies={props.movies} />
      <ul className="movies-cards__list">
        {
          props.cards.slice(0, cardsLock).map(cardElement => {
            return(<MoviesCard key={cardElement.id || cardElement.movieId} page={props.page} movieData={cardElement} title={cardElement.nameRU} duration={`${(cardElement.duration/60 >= 1) ? `${Math.floor(cardElement.duration/60)}ч` : ''} ${cardElement.duration%60}м`} image={cardElement.image.url ? `https://api.nomoreparties.co${cardElement.image.url}` : cardElement.image} likeHandler={props.handleSaveMovie} deleteHandler={props.handleDeleteMovie} moviesList={props.moviesList} />)
          })
        }
      </ul>
      <MoreMoviesButton />
    </section>
  )
}

export default MoviesCardList;
