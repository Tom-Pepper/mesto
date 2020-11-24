// Массив для вставки карточек при загрузке сайта
const initialCards = [
  {
    name: 'Остров Ольхон',
    link: './images/olkhon-island.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus-mtn.jpg'
  },
  {
    name: 'Магадан',
    link: './images/magadan.jpg'
  },
  {
    name: 'Карачаево- Черкессия',
    link: './images/karachaevo-cherkessia.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altay.jpg'
  },
  {
    name: 'Онежское озеро',
    link: './images/onezhskoe-ozero.jpg'
  }
];

// Объект для валидации полей
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_type_error'
}

// Прочие константы

