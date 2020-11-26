// Класс валидции полей поп-апов, очистки и добавления текста ошибки, переключение состояния кнопки сабмита формы
export class FormValidator {
  constructor(validationObj, form) {
    this.validationObj = validationObj;
    this.form = form;
  }

  hideError(form, input) {
    const errorPlace = form.querySelector(`#${input.name}-error`);
    errorPlace.classList.remove(this.validationObj.errorClass);
    input.classList.remove(this.validationObj.inputErrorClass);
    errorPlace.textContent = '';
  }

  _showError(form, input) {
    const errorPlace = form.querySelector(`#${input.name}-error`);
    errorPlace.textContent = input.validationMessage;
    errorPlace.classList.add(this.validationObj.errorClass);
    input.classList.add(this.validationObj.inputErrorClass);
  }

  // Функция очистки текста ошибок и проверка состояния кнопки сабмита (вызывать у нужного объекта
  // перед открытием поп-апов в index.js)
  clearErrors = (popup) => {
    const currentForm = popup.querySelector('.popup__form');
    if (currentForm) {
      const inputs = Array.from(currentForm.querySelectorAll('.popup__input'));
      inputs.forEach(input => {
        this.hideError(currentForm, input);
      });
      this.toggleButton();
    }
  }

  _checkInputValidity(form, input) {
    if (!input.checkValidity()) {
      this._showError(form, input);
    } else {
      this.hideError(form, input);
    }
  }

  toggleButton() {
    if(!this.form.checkValidity()) {
      this.submitButton.classList.add(this.validationObj.inactiveButtonClass);
      this.submitButton.setAttribute('disabled', true)
    } else {
      this.submitButton.classList.remove(this.validationObj.inactiveButtonClass);
      this.submitButton.removeAttribute('disabled');
    }
  }

  _setEventListeners() {

    const inputs = Array.from(this.form.querySelectorAll(this.validationObj.inputSelector));
    this.submitButton = this.form.querySelector(this.validationObj.submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        this._checkInputValidity(this.form, evt.target);
        this.toggleButton(this.form, this.submitButton);
      });
    });
    this.toggleButton(this.form, this.submitButton, this.validationObj);
  }

  enableValidation() {
    this.form.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      this._setEventListeners();
  }
}
