import React, {useEffect, useState, useRef} from "react";

function MoviesCard(props) {
  const isLiiked = props.moviesList.some(movie => movie.movieId === props.movieData.id);
  const [isLiked, setIsLiked] = useState(props.moviesList.some(movie => movie.movieId === props.movieData.id));
  const [savedId, setSavedId] = useState('');
  const cardElement = useRef();

  useEffect(() => {
    console.log(savedId);
  }, [savedId])

  // useEffect(() => {
  //   // console.log(savedId);
  //   console.log(props.moviesList);
  //   console.log(props.movieData);
  // }, [props.moviesList, props.movieData])

  // useEffect(() => {
  //   props.isSaved ? setIsLiked(true) : setIsLiked(false)
  // }, [props.isSaved])

  // const [updateMaker, setUpdateMaker] = useState(false);
  // console.log(props.moviesList);


  // let isLiked = false;

  // useEffect(() => {
  //   (props.moviesList.some(movie => movie.movieId === props.movieData.id) !== isLiked) && (isLiked = !isLiked)
  // }, [props.moviesList])

  // function handleForceUpdate() {
  //   console.log(props.moviesList);
  //   setUpdateMaker(!updateMaker);
  // }

  function handleLike(evt) {
    console.log(savedId);
    console.log(props.movieData.savedId);
    console.log(props.moviesList.find(movie => movie.movieId === props.movieData.id) && props.moviesList.find(movie => movie.movieId === props.movieData.id)._id);
    console.log(props.moviesList);
    // console.log(props.savedIdesArray);

    if(isLiked) {
      let id
      savedId !== ''
      ? id = savedId
      : id = (props.moviesList.find(movie => movie.movieId === props.movieData.id)._id) || props.movieData.savedId;
      props.deleteHandler(id, setIsLiked);
    } else {
      props.likeHandler(props.movieData, setIsLiked, setSavedId, cardElement);
    }
    // setIsLiked(!isLiked);
    // handleForceUpdate();
  }

  function handleDelete() {
    props.deleteHandler(props.movieData._id, cardElement);
  }

  return(
    <li className="movies-card" ref={cardElement}>
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
