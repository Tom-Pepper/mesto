const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_type_error'
}

// Функция скрытия текста ошибки заполнения
function hideError(form, input, errorClass, inputErrorClass) {
  const errorPlace = form.querySelector(`#${input.name}-error`);
  errorPlace.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);

  errorPlace.textContent = '';
}

// Функция показа текста ошибки заполнения
function showError(form, input, errorClass, inputErrorClass) {
  const errorPlace = form.querySelector(`#${input.name}-error`);
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(errorClass);
  input.classList.add(inputErrorClass);

}

// Проверка полей на валидность
function checkInputValidity(form, input, errorClass, inputErrorClass) {
  if (!input.checkValidity()) {
    showError(form, input, errorClass, inputErrorClass);
  } else {
    hideError(form, input, errorClass, inputErrorClass);
  }
}

// Функция активации/ деактивации кнопки сабмита в зависимости от валидности полей формы
function toggleButton(form, submitButton, inactiveButtonClass) {
  if(form.checkValidity()) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = 'false';
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = 'true';
  }
}

// Функиця установки листнеров для всех инпутов
function setEventListeners(form, { inputSelector, submitButtonSelector, inactiveButtonClass,
  errorClass, inputErrorClass }) {

  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', evt => {
      checkInputValidity(form, evt.target, errorClass, inputErrorClass);
      toggleButton(form, submitButton, inactiveButtonClass, inputErrorClass);
    });
  });

  toggleButton(form, submitButton, inactiveButtonClass, inputErrorClass);
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
