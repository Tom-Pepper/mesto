import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitFormCallback) {
    super(popup);
    this._submitFormCallback = submitFormCallback;
  }

  _getInputValues() {
    // Собирает данные всех полей формы
  }

  setEventListeners() {
    super.setEventListeners();
    // Добавить обработчик сабмита формы
  }

  close() {
    super.close();
    // При закрытии форма должна сбрасываться еще
  }

}

// Для каждого попапа создать свой экземпляр этого класса
