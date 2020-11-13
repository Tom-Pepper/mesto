export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
  }

  _handleEscClose(event) {
    const popupIsOpened = event.currentTarget.querySelector('.popup_is-opened');
    if (event.key === 'Escape' && popupIsOpened) {
      popupIsOpened.classList.remove('popup_is-opened');
    }
  }

  setEventListeners() {
    this._popup
      .querySelector('.popup__close')
      .addEventListener('click', () => this.close());
  }
}
