function movieFilter(movies, inputValue) {
  return movies.filter((movie) => {
    return (movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputValue.toLowerCase()));
  })
}

export { movieFilter };
