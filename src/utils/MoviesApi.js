class MoviesApi {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  _checkResponse (res) {
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies () {
    return (fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
    }))
      .then(this._checkResponse)
  }
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
};
const moviesApi = new MoviesApi(config);

export {moviesApi};
