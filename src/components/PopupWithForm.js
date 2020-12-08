import { Popup } from "./Popup.js";

// Класс для созданий объектов - поп-апов, которые содержат в себе форму
export class PopupWithForm extends Popup {
  constructor({ popup, submitFormCallback }) {
    super(popup);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      this._submitFormCallback(event, this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  _getInputValues() {
    const inputsWithValues = {};
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._inputs.forEach((input) => {
      inputsWithValues[input.name] = input.value;
    });
    return inputsWithValues;
  }
}
