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
      }, '.elements__template', () => {
        const image = new PopupWithImage(newPlace, imageFullSize);
        image.setEventListeners();
        image.open();
      });
      cardPosition.prepend(newPlace.create());
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
const initial = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({
      name: data.name,
      link: data.link
    }, '.elements__template', () => {
      const image = new PopupWithImage(card, imageFullSize);
      image.setEventListeners();
      image.open();
    });
    initial.addItem(card.create());
  }
}, cardPosition);

// Слушатель. Открытие поп-апа редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = currentUser.getUserInfo().name;
  jobInput.value = currentUser.getUserInfo().job;
  editProfileForm.clearErrors(popupEditProfile);
  profilePopup.open();
});

// Слушатель открытия окна добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  newPlaceForm.clearErrors(addPlacePopup);
  placePopup.open();
});

//Отрисовка начального массива картинок
initial.renderItems();
