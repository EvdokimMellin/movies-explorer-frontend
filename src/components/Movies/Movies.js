import GlobalNav from "../GlobalNav/GlobalNav";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies(props) {
  return (<main>
    <GlobalNav page="movies" />
    <SearchForm searchHandler={props.handleSearch} checkboxClickHandler={props.setOnlyShortMovies} onlyShortMovies={props.onlyShortMovies} searchData={props.searchData} page='movies' isLoading={props.isLoading} />
    <MoviesCardList page="movies" cards={props.cards} handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie} moviesList={props.savedMovies} isLoading={props.isLoading} notFound={props.notFound} movies={props.movies} />
    <Footer />
  </main>);
}
