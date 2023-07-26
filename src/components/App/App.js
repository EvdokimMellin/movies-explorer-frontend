import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import GlobalNav from '../GlobalNav/GlobalNav';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import User from '../User/User';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { movieFilter } from '../../utils/movieFilter';
import { shortMoviesFilter } from '../../utils/shortMoviesFilter';


function App() {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [conflictError, setConflictError] = useState(false);
  const [unauthorizedError, setUnauthorizedError] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [notFoundSaved, setNotFoundSaved] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  useEffect(() => {
    if (onlyShortMovies) {
      setCards(shortMoviesFilter(movieFilter(movies, searchData)));
      setSavedCards(shortMoviesFilter(movieFilter(savedMovies, searchData)));
      shortMoviesFilter(movieFilter(movies, searchData)).length !== 0 ? setNotFound(false) : setNotFound(true);
      shortMoviesFilter(movieFilter(savedMovies, searchData)).length !== 0 ? setNotFoundSaved(false) : setNotFoundSaved(true);
    } else {
      setCards(movieFilter(movies, searchData));
      setSavedCards(movieFilter(savedMovies, searchData));
      movieFilter(movies, searchData).length !== 0 ? setNotFound(false) : setNotFound(true);
      movieFilter(savedMovies, searchData).length !== 0 ? setNotFoundSaved(false) : setNotFoundSaved(true);
    }
  }, [searchData, onlyShortMovies, savedMovies, movies])

  useEffect (() => {
    mainApi.getSavedMovies()
      .then((sMovies) => {
        setSavedMovies(sMovies);
        setLoginState(true);
      })
      .finally(() => {setIsTokenChecked(true)})
      .catch((err) => console.log(err));
  }, [loginState])

  useEffect(() => {
    localStorage.getItem('keyWord') && handleSearch(localStorage.getItem('keyWord'));
    localStorage.getItem('onlyShortMovies') === 'true' && setOnlyShortMovies(true);
  }, [])

  useEffect(() => {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err))
  }, [loginState])


  function Main () {
    return (<>
      {loginState ? <GlobalNav page="main" /> : <NavTab />}
      <Promo />
      <main>
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>);
  }

  function Movies() {
    return (<main>
      <GlobalNav page="movies" />
      <SearchForm searchHandler={handleSearch} checkboxClickHandler={setOnlyShortMovies} onlyShortMovies={onlyShortMovies} />
      <MoviesCardList page="movies" cards={cards} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} moviesList={savedMovies} isLoading={isLoading} notFound={notFound} movies={movies} />
      <Footer />
    </main>);
  }

  function SavedMovies() {
    return (<main>
      <GlobalNav page="saved-movies" />
      <SearchForm searchHandler={handleSearch} checkboxClickHandler={setOnlyShortMovies} onlyShortMovies={onlyShortMovies} />
      <MoviesCardList page="saved-movies" cards={savedCards} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} moviesList={savedMovies} isLoading={isLoading} notFound={notFoundSaved} />
      <Footer />
    </main>);
  }

  function ProfilePage() {
    return (<>
      <GlobalNav />
      <Profile setLoginState={setLoginState} logoutHandler={handleLogout} editProfileHandler={handleEditProfile} setConflictError={setConflictError} conflictError={conflictError} isPopupOpened={isPopupOpened} setIsPopupOpened={setIsPopupOpened} />
    </>);
  }

  function handleSearch(inputValue) {
    setSearchData(inputValue);
    localStorage.setItem('keyWord', inputValue);

    if(movies.length === 0) {
      setIsLoading(true)
      moviesApi.getMovies()
        .then((res) => {
          res.forEach(movie => {
            savedMovies.forEach(sMovie => {
              if (sMovie.movieId === movie.id) {
                movie.isSaved = true;
                movie.savedId = sMovie._id;
              }
            })
          });
          setMovies(res);
        })
        .finally(() => {setIsLoading(false)})
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }

  function handleRegister({email, password, name}) {
    mainApi.register({email, password, name})
      .then(res => {
        console.log(res);
        setConflictError(false);
      })
      .then(() => handleLogin({email, password}))
      .catch(err => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setConflictError(true);
        }
      });
  }

  function handleLogin({email, password}) {
    mainApi.login({email, password})
      .then(res => {
        console.log(res);
        setLoginState(true);
        setUnauthorizedError(false);
        history.push('/movies');
      })
      .catch(err => {
        if (err === 'Ошибка: 401') {
          setUnauthorizedError(true);
        }
        console.log(err);
      });
  }

  function handleLogout() {
    mainApi.logout()
      .then(res => {
        console.log(res);
        setLoginState(false);
        setSearchData('');
        setOnlyShortMovies(false)
        localStorage.clear();
        setMovies([]);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function handleEditProfile(name, email) {
    mainApi.editProfile(name, email)
      .then(res => {
        console.log(res);
        setCurrentUser(res);
        setConflictError(false);
        setIsPopupOpened(true);
      })
      .catch(err => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setConflictError(true);
        }
      });
  }

  function handleSaveMovie(movie, buttonElement) {
    mainApi.saveMovie(movie)
      .then(res => {
        setSavedMovies([res, ...savedMovies]);
        console.log(res);
        buttonElement.classList.add('movies-card__like-button_active');
      })
      .catch(err => console.log(err));
  }

  function handleDeleteMovie(movieId, buttonElement) {
    mainApi.deleteMovie(movieId)
      .then(res => {
        setSavedMovies(savedMovies.filter((savedMovie) => {
          return(savedMovie._id !== movieId);
        }))
        buttonElement && buttonElement.classList.remove('movies-card__like-button_active');
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  if(!isTokenChecked) {
    return <></>;
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute path="/movies" loginState={loginState} component={Movies} />
          <ProtectedRoute path="/saved-movies" loginState={loginState} component={SavedMovies} />
          <ProtectedRoute path="/profile" loginState={loginState} component={ProfilePage} />
          <Route path="/signup">
            <User page='register' submitHandler={handleRegister} setConflictError={setConflictError} conflictError={conflictError} setUnauthorizedError={setUnauthorizedError} unauthorizedError={unauthorizedError} />
            {loginState && <Redirect to="/" />}
          </Route>
          <Route path="/signin">
            <User page='login' submitHandler={handleLogin} setUnauthorizedError={setUnauthorizedError} unauthorizedError={unauthorizedError} setConflictError={setConflictError} conflictError={conflictError} />
            {loginState && <Redirect to="/" />}
          </Route>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
