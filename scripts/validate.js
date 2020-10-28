const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_type_error'
}

// Функция скрытия текста ошибки заполнения
function hideError(form, input) {
  const errorPlace = form.querySelector(`#${input.name}-error`);
  errorPlace.classList.remove(validationObj.errorClass);
  input.classList.remove(validationObj.inputErrorClass);

  errorPlace.textContent = '';
}

// Функция показа текста ошибки заполнения
function showError(form, input) {
  const errorPlace = form.querySelector(`#${input.name}-error`);
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(validationObj.errorClass);
  input.classList.add(validationObj.inputErrorClass);

}

// Проверка полей на валидность
function checkInputValidity(form, input) {
  if (!input.checkValidity()) {
    showError(form, input);
  } else {
    hideError(form, input);
  }
}

// Функция активации/ деактивации кнопки сабмита в зависимости от валидности полей формы
function toggleButton(form, submitButton, {inactiveButtonClass}) {
  if(!form.checkValidity()) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true)
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

// Функиця установки листнеров для всех инпутов
function setEventListeners(form, { inputSelector, submitButtonSelector, inactiveButtonClass }) {

  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', evt => {
      checkInputValidity(form, evt.target);
      toggleButton(form, submitButton, {inactiveButtonClass});
    });
  });

  toggleButton(form, submitButton, {inactiveButtonClass});
}

// Функция добавления листнера на все формы
function enableValidation({ formSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(form, {...rest});
  });
}

enableValidation(validationObj);
