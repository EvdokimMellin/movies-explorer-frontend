import React from "react";

function Preloader(props) {
  return(
    <div className={`preloader ${(props.isLoading) && 'preloader_sate_is-loading'} ${(props.notFound) && 'preloader_state_not-found'}`}>
      {
        (props.movies && props.movies.length === 0 && !props.isLoading)
        ? <p className="preloader__text">Введите название фильма</p>
        : <p className="preloader__text">{`${props.isLoading ? 'Пожалуйста, подождите...' : 'Ничего не найдено'}`}</p>
      }
    </div>
  )
}

export default Preloader;
