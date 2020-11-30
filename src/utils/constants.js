// Импорт картинок для сборки вебпаком
import olkhon from '../images/olkhon-island.jpg';
import elbrus from '../images/elbrus-mtn.jpg';
import magadan from '../images/magadan.jpg';
import cherkessia from '../images/karachaevo-cherkessia.jpg';
import altai from '../images/altay.jpg';
import ozero from '../images/onezhskoe-ozero.jpg';

// Массив для вставки карточек при загрузке сайта
export const initialCards = [
  {
    name: 'Остров Ольхон',
    link: olkhon
  },
  {
    name: 'Гора Эльбрус',
    link: elbrus
  },
  {
    name: 'Магадан',
    link: magadan
  },
  {
    name: 'Карачаево- Черкессия',
    link: cherkessia
  },
  {
    name: 'Алтай',
    link: altai
  },
  {
    name: 'Онежское озеро',
    link: ozero
  }
];

// Объект для валидации полей
export const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_type_error'
};

// Констарнты - селекторы
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonAddPlace = document.querySelector(".profile__add-button");
export const popupEditProfile = document.querySelector(".popup__edit-profile");
export const addPlacePopup = document.querySelector(".popup-new-place");
export const formElement = popupEditProfile.querySelector(".popup__form");
export const nameInput = popupEditProfile.querySelector(".popup__name");
export const jobInput = popupEditProfile.querySelector(".popup__job");
export const nameToEdit = document.querySelector(".profile__info-name");
export const jobToEdit = document.querySelector(".profile__info-job");
export const formAddPlace = addPlacePopup.querySelector('.popup-new-place__form');
export const cardPosition = document.querySelector('.elements');
export const imageFullSize = document.querySelector('.popup-image');
