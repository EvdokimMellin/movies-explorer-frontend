import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProfilePage from '../ProfilePage/ProfilePage';
import User from '../User/User';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PopupError from '../PopupError/PopupError';
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
  const [onlyShortSavedMovies, setOnlyShortSavedMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [savedSearchData, setSavedSearchData] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [notFoundSaved, setNotFoundSaved] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (onlyShortMovies) {
      setCards(shortMoviesFilter(movieFilter(movies, searchData)));
      shortMoviesFilter(movieFilter(movies, searchData)).length !== 0 ? setNotFound(false) : setNotFound(true);
    } else {
      setCards(movieFilter(movies, searchData));
      movieFilter(movies, searchData).length !== 0 ? setNotFound(false) : setNotFound(true);
    }
  }, [searchData, onlyShortMovies, movies]);

  useEffect(() => {
    if (onlyShortSavedMovies) {
      setSavedCards(shortMoviesFilter(movieFilter(savedMovies, savedSearchData)));
      shortMoviesFilter(movieFilter(savedMovies, savedSearchData)).length !== 0 ? setNotFoundSaved(false) : setNotFoundSaved(true);
    } else {
      setSavedCards(movieFilter(savedMovies, savedSearchData));
      movieFilter(savedMovies, savedSearchData).length !== 0 ? setNotFoundSaved(false) : setNotFoundSaved(true);
    }
  }, [savedSearchData, onlyShortSavedMovies, savedMovies])

  useEffect (() => {
    mainApi.getSavedMovies()
      .then((sMovies) => {
        setSavedMovies(sMovies);
        setLoginState(true);
      })
      .finally(() => {setIsTokenChecked(true)})
      .catch((err) => {
        err !== 'Ошибка: 401' && setServerError(err);
        console.log(err);
      });
  }, [loginState])

  useEffect(() => {
    // На странице movies строка поиска и состояние переключателя сохраняются при обновлении страницы,
    // а на saved-movies - нет, чтобы пользователь при каждом заходе на страницу видел все фильмы, что он сохранил
    localStorage.getItem('keyWord') && handleSearch(localStorage.getItem('keyWord'));
    localStorage.getItem('onlyShortMovies') === 'true' && setOnlyShortMovies(true);
  }, [])

  useEffect(() => {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        err !== 'Ошибка: 401' && setServerError(err);
        console.log(err);
      })
  }, [loginState])

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
          setServerError(err);
          console.log(err);
        });
    }
  }

  function handleSearchSaved(inputValue) {
    setSavedSearchData(inputValue);
  }

  function handleRegister({email, password, name}) {
    setOnRequest(true)
    mainApi.register({email, password, name})
      .then(res => {
        console.log(res);
        setConflictError(false);
      })
      .then(() => handleLogin({email, password}))
      .finally(() => {setOnRequest(false)})
      .catch(err => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setConflictError(true);
        } else {
          setServerError(err)
        }
      });
  }

  function handleLogin({email, password}) {
    setOnRequest(true)
    mainApi.login({email, password})
      .then(res => {
        console.log(res);
        setLoginState(true);
        setUnauthorizedError(false);
        history.push('/movies');
      })
      .finally(() => {setOnRequest(false)})
      .catch(err => {
        if (err === 'Ошибка: 401') {
          setUnauthorizedError(true);
        } else {
          setServerError(err);
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
      .catch((err) => {
        setServerError(err);
        console.log(err);
      });
  }

  function handleEditProfile(name, email) {
    setOnRequest(true);
    mainApi.editProfile(name, email)
      .then(res => {
        console.log(res);
        setCurrentUser(res);
        setConflictError(false);
        setIsPopupOpened(true);
      })
      .finally(() => {setOnRequest(false)})
      .catch(err => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setConflictError(true);
        } else {
          setServerError(err)
        }
      });
  }

  function handleSaveMovie(movie) {
    setOnRequest(true);
    mainApi.saveMovie(movie)
      .then(res => {
        setSavedMovies([res, ...savedMovies]);
        console.log(res);
      })
      .finally(() => {setOnRequest(false)})
      .catch((err) => {
        setServerError(err);
        console.log(err);
      });
  }

  function handleDeleteMovie(movieId) {
    setOnRequest(true);
    mainApi.deleteMovie(movieId)
      .then(res => {
        setSavedMovies(savedMovies.filter((savedMovie) => {
          return(savedMovie._id !== movieId);
        }))
        console.log(res);
      })
      .finally(() => {setOnRequest(false)})
      .catch((err) => {
        setServerError(err);
        console.log(err);
      });
  }

  if(!isTokenChecked) {
    return <></>;
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <PopupError serverError={serverError} setServerError={setServerError} />

        <Switch>

          <Route exact path="/">
            <Main loginState={loginState} />
          </Route>

          <ProtectedRoute path="/movies" loginState={loginState} component={Movies} handleSearch={handleSearch} setOnlyShortMovies={setOnlyShortMovies} onlyShortMovies={onlyShortMovies} searchData={searchData} cards={cards} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} savedMovies={savedMovies} isLoading={isLoading} notFound={notFound} movies={movies} onRequest={onRequest} />

          <ProtectedRoute path="/saved-movies" loginState={loginState} component={SavedMovies} handleSearchSaved={handleSearchSaved} setOnlyShortSavedMovies={setOnlyShortSavedMovies} savedSearchData={savedSearchData} onlyShortSavedMovies={onlyShortSavedMovies} savedCards={savedCards} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} savedMovies={savedMovies} isLoading={isLoading} notFoundSaved={notFoundSaved} movies={movies} onRequest={onRequest} />

          <ProtectedRoute path="/profile" loginState={loginState} component={ProfilePage} setLoginState={setLoginState} handleLogout={handleLogout} handleEditProfile={handleEditProfile} setConflictError={setConflictError} conflictError={conflictError} isPopupOpened={isPopupOpened} setIsPopupOpened={setIsPopupOpened} onRequest={onRequest} />

          <Route path="/signup">
            <User page='register' submitHandler={handleRegister} setConflictError={setConflictError} conflictError={conflictError} setUnauthorizedError={setUnauthorizedError} unauthorizedError={unauthorizedError} onRequest={onRequest} />
            {loginState && <Redirect to="/" />}
          </Route>
          <Route path="/signin">
            <User page='login' submitHandler={handleLogin} setUnauthorizedError={setUnauthorizedError} unauthorizedError={unauthorizedError} setConflictError={setConflictError} conflictError={conflictError} onRequest={onRequest} />
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
