import { Popup } from "./Popup.js";

export class PopupWithError extends Popup {
  constructor(popup) {
    super(popup);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector('.popup__error-button')
      .addEventListener('click', () => this.close());
  }

  showError(error) {
    this._popup.querySelector('.popup__error-text').textContent = error;
  }
}
