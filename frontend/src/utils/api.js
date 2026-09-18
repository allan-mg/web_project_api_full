class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: import.meta.env.PROD
    ? "https://api.allan-around.chickenkiller.com"
    : "http://localhost:3000",
});

export default api;
