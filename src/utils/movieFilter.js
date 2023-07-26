function movieFilter(movies, inputValue) {
  if(inputValue) {
    return movies.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputValue.toLowerCase()));
    })
  } else {
    return (movies);
  }
}

export { movieFilter };
