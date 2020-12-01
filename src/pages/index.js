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

// Создание объекта для карточки- превьюхи
const imagePreview = new PopupWithImage(imageFullSize);
imagePreview.setEventListeners();

// Создание объекта карточки
function createCard(values, selector) {
  const card = new Card(values
    // name: values['place-name'] || values.name,
    // link: values['place-link'] || values.link
  , selector, () => imagePreview.open(card));
  return card;
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
      const newPlace = createCard({
        name: values['place-name'],
        link: values['place-link']
      }, '.elements__template');
      cardsSection.addItem(newPlace.create(), false);
      placePopup.close();
    }
  }
);
placePopup.setEventListeners();

// Валидация поп-апов профиля и добавления карточки
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();

// Создание объекта для отрисовки изначального массива картинок
const cardsSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = createCard({
      name: data.name,
      link: data.link
    }, '.elements__template')
    cardsSection.addItem(card.create(), true);
  }
}, cardPosition);

// Кнопка редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
  const userInfo = currentUser.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  editProfileForm.clearErrors(popupEditProfile);
  profilePopup.open();
});

// Кнопка добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  newPlaceForm.clearErrors(addPlacePopup);
  placePopup.open();
});

//Отрисовка начального массива картинок
cardsSection.renderItems();
