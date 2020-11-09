export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = document.querySelector(templateSelector).content;
  }

  _like(evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle('element__like-button_active');
  }

  _delete(evt) {
    const deleteTarget = evt.target;
    deleteTarget.closest('.element').remove();
  }

  create() {
    this._content = this._templateSelector.cloneNode(true);
    this._content.querySelector('.element__title').innerText = this._name;
    this.image = this._content.querySelector('.element__image');
    this.image.src = this._link;
    this.image.alt = this._name;

    this._content.querySelector('.element__like-button').addEventListener('click', this._like);
    this._content.querySelector('.element__delete-button').addEventListener('click', this._delete);

    return this._content;
  }
}
