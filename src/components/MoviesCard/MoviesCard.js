import React from "react";

function MoviesCard(props) {
  const isLiked = props.moviesList.some(movie => movie.movieId === props.movieData.id);

  function handleLike(evt) {
    if(evt.target.classList.contains('movies-card__like-button_active')) {
      let id
      props.movieData.savedId
        ? id = props.movieData.savedId
        : id = props.moviesList.find(movie => movie.movieId === props.movieData.id)._id;
      props.deleteHandler(id, evt.target)
    } else {
      props.likeHandler(props.movieData, evt.target);
    }
  }

  function handleDelete() {
    props.deleteHandler(props.movieData._id);
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
