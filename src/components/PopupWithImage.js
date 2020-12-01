import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  close() {
    super.close();
  }

  open(card) {
    const name = card.name;
    const preview = this._popup.querySelector('.popup-image__preview');
    preview.src = card.link;
    preview.alt = name;
    this._popup
      .querySelector('.popup-image__title')
      .textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
