export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorMessage(err) {
    return Promise.reject(`Что- то пошло не так. Ошибка: ${err.status}. ${err.message}`)
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return this._errorMessage(res);
        }
      })
      .catch(err => this._errorMessage(err));
  }

  getUserData() {
    return fetch(`${this._url}users/me`,
      {
        headers: this._headers
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return this._errorMessage(res);
        }
      })
      .catch(err => this._errorMessage(err));
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getCards()]);
  }

  editProfile(name, job) {
    return fetch(`${this._url}users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
  }

  addNewCard(name, link) {
    return fetch(`${this._url}cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
  }

}
