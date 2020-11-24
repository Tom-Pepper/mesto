// Класс отвечает за открытие и закрытие поп-апов
export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));

  }

  _handleEscClose(event) {
    const popupIsOpened = event.currentTarget.querySelector('.popup_is-opened');
    if (event.key === 'Escape' && popupIsOpened) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector('.popup__close')
      .addEventListener('click', () => this.close());
  }
}
