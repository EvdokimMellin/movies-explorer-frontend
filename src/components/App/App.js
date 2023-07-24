import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
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


  useEffect(() => {
    if (onlyShortMovies) {
      setCards(shortMoviesFilter(movies));
      setSavedCards(shortMoviesFilter(savedMovies));
    } else {
      setCards(movies);
      setSavedCards(savedMovies);
    }
  }, [onlyShortMovies])

  useEffect(() => {
    setSavedCards(savedMovies);
  }, [savedMovies])

  useEffect (() => {
    Promise.all([moviesApi.getMovies(), mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([movies, userData, sMovies]) => {
        setSavedMovies(sMovies);
        setSavedCards(sMovies);
        movies.forEach(movie => {
          sMovies.forEach(sMovie => {
            if (sMovie.movieId === movie.id) {
              movie.isSaved = true;
              movie.savedId = sMovie._id;
            }
          })
        });
        setMovies(movies);
        setCards(movies);
        setLoginState(true);
      })
      .finally(() => {setIsTokenChecked(true)})
      .catch((err) => console.log(err));
  }, [loginState])

  useEffect(() => {
    mainApi.getUserInfo()
      .then((userData) => {
        console.log(userData);
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
      <MoviesCardList page="movies" cards={cards} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} moviesList={savedMovies} isLoading={isLoading} />
      <Footer />
    </main>);
  }

  function SavedMovies() {
    return (<main>
      <GlobalNav page="saved-movies" />
      <SearchForm searchHandler={handleSearch} checkboxClickHandler={setOnlyShortMovies} onlyShortMovies={onlyShortMovies} />
      <MoviesCardList page="saved-movies" cards={savedCards} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} moviesList={savedMovies} isLoading={isLoading} />
      <Footer />
    </main>);
  }

  function ProfilePage() {
    return (<>
      <GlobalNav />
      <Profile setLoginState={setLoginState} logoutHandler={handleLogout} editProfileHandler={handleEditProfile} setConflictError={setConflictError} conflictError={conflictError} />
    </>);
  }

  function handleSearch(inputValue) {
    setIsLoading(true)
    Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies()])
      .then(([movies, savedMovies]) => {
        setCards(movieFilter(movies, inputValue));
        setSavedCards(movieFilter(savedMovies, inputValue));
      })
      .finally(() => {setIsLoading(false)})
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
      })
      .catch(err => console.log(err));
  }

  function handleEditProfile(name, email) {
    mainApi.editProfile(name, email)
      .then(res => {
        console.log(res);
        setCurrentUser(res);
        setConflictError(false);
      })
      .catch(err => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setConflictError(true);
        }
      });
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(res => {
        setSavedMovies([res, ...savedMovies]);
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(res => {
        setSavedMovies(savedMovies.filter((savedMovie) => {
          return(savedMovie._id !== movieId);
        }))
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
