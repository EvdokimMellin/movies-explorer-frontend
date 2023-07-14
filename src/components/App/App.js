import React from 'react';
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
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  const currentUser = {
    name: 'Андрей', // Временная мера до связи с сервером
    email: 'andrey@yandex.ru'
  }

  function Main () {
    return (<>
      <NavTab />
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
      <SearchForm />
      <MoviesCardList page="movies" />
    </main>);
  }

  function SavedMovies() {
    return (<main>
      <GlobalNav page="saved-movies" />
      <SearchForm />
      <MoviesCardList page="saved-movies" />
    </main>);
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <User page='register' />
        </Route>
        <Route path="/signin">
          <User page='login' />
        </Route>
        <Route path="/movies">
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <GlobalNav />
          <Profile user={currentUser} />
        </Route>
        <Route path="/*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
