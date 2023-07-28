import GlobalNav from "../GlobalNav/GlobalNav";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {
  return (<main>
    <GlobalNav page="saved-movies" />
    <SearchForm searchHandler={props.handleSearchSaved} checkboxClickHandler={props.setOnlyShortSavedMovies} searchData={props.savedSearchData} onlyShortMovies={props.onlyShortSavedMovies} page='saved-movies' isLoading={props.isLoading} />
    <MoviesCardList page="saved-movies" cards={props.savedCards} handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie} moviesList={props.savedMovies} isLoading={props.isLoading} notFound={props.notFoundSaved} onRequest={props.onRequest} />
    <Footer />
  </main>);
}
