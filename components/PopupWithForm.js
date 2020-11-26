import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popup, submitFormCallback }) {
    super(popup);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  open() {
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submitFormCallback(event, this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  _getInputValues() {
    this._inputsWithValues = {};
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      this._inputsWithValues[input.name] = input.value;
    });
    return this._inputsWithValues;
  }
}
