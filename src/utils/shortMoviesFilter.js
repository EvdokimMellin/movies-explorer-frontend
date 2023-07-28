import { shortMovieDuration } from "./constants";

function shortMoviesFilter(movies) {
  return movies.filter((movie) => {
    return (movie.duration <= shortMovieDuration);
  })
}

export { shortMoviesFilter };
