import React from "react";

function MoviesCard(props) {
  const isLiked = props.moviesList.some(movie => movie.movieId === props.movieData.id);

  function handleLike() {
    if(!props.onRequest) {
      if(isLiked) {
        let id
        props.moviesList.find(movie => movie.movieId === props.movieData.id)._id
          ? id = props.moviesList.find(movie => movie.movieId === props.movieData.id)._id
          : id = props.movieData.savedId;
        props.deleteHandler(id)
      } else {
        props.likeHandler(props.movieData);
      }
    }
  }

  function handleDelete() {
    !props.onRequest && props.deleteHandler(props.movieData._id);
  }

  return(
    <li className="movies-card">
      <a href={props.movieData.trailerLink} target="_blank" rel="noreferrer">
        <img src={props.image} alt="Превью фильма" className="movies-card__image" />
      </a>
      <div className="movies-card__like-block">
        <h2 className="movies-card__title">{props.title}</h2>
        {props.page === 'movies'
          ? <button className={`movies-card__like-button ${isLiked && 'movies-card__like-button_active'}`} type="button" onClick={handleLike}></button>
          : <button className="movies-card__delete-button" type="button" onClick={handleDelete}></button>
        }
      </div>
      <p className="movies-card__duration">{props.duration}</p>
    </li>
  )
}

export default MoviesCard;
