export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(target) {
    target.classList.remove('popup_is-opened');
  }

  _handleEscClose(event) {
    const popup = event.currentTarget.querySelector('.popup_is-opened');
    if (event.key === 'Escape' && popup) {
      popup.classList.remove('popup_is-opened');
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector('.popup__close')
      .addEventListener('click', () => this.close(this._popupSelector));
  }
}
