import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitFormCallback) {
    super(popup);
    this._submitFormCallback = submitFormCallback;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    //при закрытии попапа форма должна ещё и сбрасываться.
  }

  setEventListeners() {
    super.setEventListeners();
    //добавлять обработчик сабмита формы.
  }

  _getInputValues() {
    //Собрать данные всех полей
  }

}
