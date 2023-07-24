function shortMoviesFilter(movies) {
  return movies.filter((movie) => {
    return (movie.duration <= 40);
  })
}

export { shortMoviesFilter };
