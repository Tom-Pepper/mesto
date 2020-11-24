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
  }

  setEventListeners() {
    super.setEventListeners();
  }

}
