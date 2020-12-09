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
  ) {
    this.name = name;
    this.link = link;
    this._id = id;
    this._owner = owner._id;
    this._likes = likes;
    this._template = document.querySelector(templateSelector).content;
    this._openImage = openImage;
  }

  _like(evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle('element__like-button_active');
  }

  _delete(evt) {
    const deleteTarget = evt.target;
    deleteTarget.closest('.element').remove();
  }

  create(profileId) {
    this._content = this._template.cloneNode(true);
    this._deleteButton = this._content.querySelector('.element__delete-button');
    if (profileId === this._owner) {
      this._deleteButton.classList.add('element__delete-button_visible')
    }

    this._content
      .querySelector('.element__title')
      .innerText = this.name;

    this.image = this._content.querySelector('.element__image');
    this.image.src = this.link;
    this.image.alt = this.name;

    this._content
      .querySelector('.element__like-button')
      .addEventListener('click', this._like);

    this._deleteButton.addEventListener('click', this._delete);

    this.image.addEventListener('click', this._openImage);

    return this._content;
  }
}
