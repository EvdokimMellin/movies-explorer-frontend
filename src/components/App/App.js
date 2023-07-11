import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
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
import { api } from '../../utils/Api'

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  function Main () {
    return (<>
      <NavTab />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>);
  }

  function Movies() {
    return (<>
      <GlobalNav />
      <SearchForm />
      <MoviesCardList page="movies" />
    </>);
  }

  function SavedMovies() {
    return (<>
      <GlobalNav />
      <SearchForm />
      <MoviesCardList page="saved-movies" />
    </>);
  }

  function checkResponse (res) {
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  function register (email, password, name) {
    console.log(JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    }));
    return fetch(`http://api.movies-explorer-em.nomoredomains.work/signup`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
      }),
      credentials : 'include',
    })
      .then((res) => (checkResponse(res)))
  }

  function handleRegister (email, password, name) {
    register(email, password, name)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
          <User handleSubmit={handleRegister} />
        </Route>
        <Route path="/movies">
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
