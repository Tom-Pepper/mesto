import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._preview = this._popup.querySelector('.popup-image__preview');
    this._title = this._popup.querySelector('.popup-image__title')
  }

  close() {
    super.close();
  }

  open(card) {
    const name = card.name;
    this._preview.src = card.link;
    this._preview.alt = name;
    this._title.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
