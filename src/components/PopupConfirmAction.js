import { Popup } from "./Popup.js";

//Класс поп-апа окна для подтверждения действия пользователем
export class PopupConfirmAction extends Popup {
  constructor(popup, deleteCardCallBack) {
    super(popup);
    this._deleteCardCallBack = deleteCardCallBack;
    this._button = document.querySelector('.popup__button-confirm');
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this._deleteCardCallBack(this._card);
    })
    super.setEventListeners();
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
