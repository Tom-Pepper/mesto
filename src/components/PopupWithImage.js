import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(card, popup) {
    super(popup);
    this._name = card.name;
    this._link = card.link;
  }

  close() {
    super.close();
  }

  open() {
    const preview = this._popup.querySelector('.popup-image__preview');
    preview
      .src = this._link;
    preview
      .alt = this._name;
    this._popup
      .querySelector('.popup-image__title')
      .textContent = this._name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
