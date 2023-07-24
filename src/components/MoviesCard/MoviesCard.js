import React, { useState } from "react";

function MoviesCard(props) {
  const isLiked = props.moviesList.some(movie => movie.movieId === props.movieData.id);
  function handleLike(evt) {
    if(evt.target.classList.contains('movies-card__like-button_active')) {
      evt.target.classList.remove('movies-card__like-button_active');
      let id
      props.movieData.savedId
        ? id = props.movieData.savedId
        : id = props.moviesList.find(movie => movie.movieId === props.movieData.id)._id;
      props.deleteHandler(id)
    } else {
      evt.target.classList.add('movies-card__like-button_active');
      props.likeHandler(props.movieData);
    }
  }

  function handleDelete(evt) {
    props.deleteHandler(props.movieData._id, evt.target);
  }

  return(
    <li className="movies-card">
      <img src={props.image} alt="Превью фильма" className="movies-card__image"/>
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
