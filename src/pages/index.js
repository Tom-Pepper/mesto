import '../pages/index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  validationObj,
  initialCards,
  buttonEditProfile,
  buttonAddPlace,
  popupEditProfile,
  addPlacePopup,
  formElement,
  nameInput,
  jobInput,
  nameToEdit,
  jobToEdit,
  formAddPlace,
  cardPosition,
  imageFullSize
} from "../utils/constants.js";

// Функция для создания экземпляра открытия превью картинки
function openImage(object, photo) {
  const imageToOpen = new PopupWithImage(object, photo);
  imageToOpen.setEventListeners();
  imageToOpen.open();
}

// Объект профиля
const currentUser = new UserInfo(
  { name: nameToEdit,
    job: jobToEdit });

// Создание объекта поп-апа профилия
const profilePopup = new PopupWithForm(
  {
    popup: popupEditProfile,
    submitFormCallback: (event, values) => {
      event.preventDefault();
      currentUser.setUserInfo(
        {
          name: values['profile-name'],
          job: values['profile-job']
        }
      );
    }
  }
);
profilePopup.setEventListeners();

// Создание объекта поп-апа добавления карточки (места)
const placePopup = new PopupWithForm(
  {
    popup: addPlacePopup,
    submitFormCallback: (event, values) => {
      event.preventDefault();
      const newPlace = new Card({
        name: values['place-name'],
        link: values['place-link']
      }, '.elements__template', () => openImage(newPlace, imageFullSize));
      // cardPosition.prepend(newPlace.create());
      cardsSection.addItem(newPlace.create(), false);
      placePopup.close();
    }
  }
);
placePopup.setEventListeners();

// Создание объектов форм в каждом поп-апе для валидации
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();

// Создание объекта для отрисовки изначального массива картинок
const cardsSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({
      name: data.name,
      link: data.link
    }, '.elements__template', () => openImage(card, imageFullSize));
    cardsSection.addItem(card.create(), true);
  }
}, cardPosition);

// Слушатель. Открытие поп-апа редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
  const getUserInfo = currentUser.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.job;
  editProfileForm.clearErrors(popupEditProfile);
  profilePopup.open();
});

// Слушатель открытия окна добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  newPlaceForm.clearErrors(addPlacePopup);
  placePopup.open();
});

//Отрисовка начального массива картинок
cardsSection.renderItems();
