class MainApi {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
    this._moviesBaseUrl = options.moviesBaseUrl;
  }

  _checkResponse (res) {
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }



  getSavedMovies () {
    return (fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials : 'include',
    }))
      .then(this._checkResponse);
  }

  register ({email, password, name}) {
    return (fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials : 'include',
      body: JSON.stringify({
        email, password, name
      }),
    }))
      .then(this._checkResponse);
  }

  login ({email, password}) {
    return (fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials : 'include',
      body: JSON.stringify({
        email, password
      }),
    }))
      .then(this._checkResponse);
  }

  logout () {
    return (fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials : 'include',
    }))
      .then(this._checkResponse);
  }

  editProfile (name, email) {
    return (fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials : 'include',
      body: JSON.stringify({
        email, name
      })
    }))
      .then(this._checkResponse);
  }

  getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials : 'include',
    })
      .then(this._checkResponse);
  }

  saveMovie(movie) {
    const movieData ={
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co' + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
      movieId: movie.id
    }

    return fetch('https://api.movies-explorer-em.nomoredomains.work/movies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(
          movieData
        ),
      })
      .then(this._checkResponse);
    }

  deleteMovie(movieId) {
      return fetch(`https://api.movies-explorer-em.nomoredomains.work/movies/${movieId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
      })
      .then(this._checkResponse);
  }
}

const config = {
  headers: {
    'Content-Type': 'application/json'
    // 'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJiMDIzMjE1MTE1NTRhYjg4ZTM2NDEiLCJpYXQiOjE2ODk5Nzc0MDksImV4cCI6MTY5MDU4MjIwOX0.tua3z8ulTFLv4ymqy_DVNIy5stwnVm95u1WENSLSEQo'
  },
  baseUrl: 'https://api.movies-explorer-em.nomoredomains.work',
  moviesBaseUrl: 'https://api.nomoreparties.co'
};
const mainApi = new MainApi(config);

export {mainApi};
