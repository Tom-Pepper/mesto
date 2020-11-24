// Класс отвечает за открытие и закрытие поп-апов
export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('click', this._handleOverlayClose.bind(this));
  }

  _handleOverlayClose(event) {
    const currentModalWindow = event.currentTarget;
    if (event.target === currentModalWindow) {
      this.close();
    }
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector('.popup__close')
      .addEventListener('click', () => this.close());
  }
}
