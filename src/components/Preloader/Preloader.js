import React from "react";

function Preloader(props) {
  return(
    <div className={`preloader ${props.isLoading && 'preloader_active'}`}>
      <p className="preloader__text">Пожалуйста, подождите...</p>
    </div>
  )
}

export default Preloader;
