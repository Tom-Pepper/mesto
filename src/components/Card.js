import { catchError } from "../pages/index.js";

// Класс добавления новой карточки, с функционалом лайка и удаления
export class Card {
  constructor(
    { name,
      link,
      id,
      owner,
      likes = []
    },
    templateSelector,
    openImage,
    api
  ) {
    this.name = name;
    this.link = link;
    this._id = id;
    this._owner = owner._id;
    this._likes = likes;
    this._template = document.querySelector(templateSelector).content;
    this._openImage = openImage;
    this._api = api;
  }

  _setLikes(number) {
    this._likeCounter.textContent = number;
  }

  _like() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._api.dislikeCard(this._id)
        .then(res => {
          this._likeToggle();
          this._setLikes(res.likes.length);
        })
        .catch(err => catchError(err));
    } else {
      this._api.likeCard(this._id)
        .then(res => {
          this._likeToggle();
          this._setLikes(res.likes.length);
        })
        .catch(err => catchError(err));
    }
  }

  _likeToggle() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _delete(evt) {
    const deleteTarget = evt.target;
    deleteTarget.closest('.element').remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._like.bind(this));
    this._deleteButton.addEventListener('click', this._delete);
    this.image.addEventListener('click', this._openImage);
  }

  create(profileId) {
    this._content = this._template.cloneNode(true);
    this._deleteButton = this._content.querySelector('.element__delete-button');
    this._likeButton = this._content.querySelector('.element__like-button');
    this._likeCounter = this._content.querySelector('.element__like-counter')

    if(this._likes.some(like => like._id === profileId)) {
      this._likeToggle();
    }

    this._setLikes(this._likes.length);

    if (profileId === this._owner) {
      this._deleteButton.classList.add('element__delete-button_visible');
    }

    this._content
      .querySelector('.element__title')
      .innerText = this.name;

    this.image = this._content.querySelector('.element__image');
    this.image.src = this.link;
    this.image.alt = this.name;

    this._setEventListeners();
    return this._content;
  }

  getId() {
    return this._id;
  }
}
