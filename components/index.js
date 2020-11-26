import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// Переменные
const profileEditForm = document.forms['profile-edit'];
const addPlaceForm = document.forms['profile-add-place'];

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const addPlacePopup = document.querySelector(".popup-new-place");
const buttonClosePopup = popupEditProfile.querySelector(".popup__close");
const buttonCloseAddPlacePopup = document.querySelector(".popup-new-place__close");

const formElement = popupEditProfile.querySelector(".popup__form");
const nameInput = popupEditProfile.querySelector(".popup__name");
const jobInput = popupEditProfile.querySelector(".popup__job");
const nameToEdit = document.querySelector(".profile__info-name");
const jobToEdit = document.querySelector(".profile__info-job");

const formAddPlace = addPlacePopup.querySelector('.popup-new-place__form');
const placeDescInput = addPlacePopup.querySelector('.popup-new-place__description');
const placeImgInput = addPlacePopup.querySelector('.popup-new-place__image-link');

const cardPosition = document.querySelector('.elements');

const imageFullSize = document.querySelector('.popup-image');
const fullSizeCloseButton = imageFullSize.querySelector('.popup-image__close');
const fullSizePhoto = imageFullSize.querySelector('.popup-image__preview');
const imageFullSizeTitle = imageFullSize.querySelector('.popup-image__title');

// Слушатель. Открытие поп-апа редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = currentUser.getUserInfo().name;
  jobInput.value = currentUser.getUserInfo().job;
  editProfileForm.clearErrors(popupEditProfile);
  profilePopup.open();
});

// Слушатель открытия окна добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  addPlaceForm.reset();
  newPlaceForm.clearErrors(addPlacePopup);
  placePopup.open();
});

// Объект профиля
const currentUser = new UserInfo(
  { name: nameToEdit,
    job: jobToEdit });

// Функция заполнения имени и проф-и
// function fillUserInfo(event, obj) {
//   event.preventDefault();
//   currentUser.setUserInfo({
//     name: obj.name,
//     job: obj.job
//   });
// };

// Создание объекта поп-апа профилия
const profilePopup = new PopupWithForm(
  {
    popup: popupEditProfile,
    submitFormCallback: (event, values) => {
      event.preventDefault();
      currentUser.setUserInfo(
        {
          name: values.name,
          job: values.job
        }
      );
    }
  }
);
profilePopup.setEventListeners();
//   evt.preventDefault();
//   nameToEdit.textContent = nameInput.value;
//   jobToEdit.textContent = jobInput.value;
//   profilePopup.close();

// Создание объекта поп-апа добавления карточки (места)
const placePopup = new PopupWithForm(
  {
    popup: addPlacePopup,
    submitFormCallback: (values) => {
      const newPlace = new Card({values}, '.elements__template', () => {
        const image = new PopupWithImage(newPlace, imageFullSize);
        image.setEventListeners();
        image.open();
      })
      cardPosition.prepend(newPlace.create());
      placePopup.close();
    }
  }
);
placePopup.setEventListeners();
//   addPlacePopup, (evt) => {
//   evt.preventDefault();
//   const newPlace = new Card(placeDescInput.value, placeImgInput.value,
//     '.elements__template', () => {
//       const image = new PopupWithImage(newPlace, imageFullSize);
//       image.setEventListeners();
//       image.open();
//     });
//   cardPosition.prepend(newPlace.create());
//
//   placePopup.close();
// });
// placePopup.setEventListeners();


// Создание объектов форм в каждом поп-апе для валидации
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();

// Создание объекта для отрисовки изначального массива картинок
const initial = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({ data }, '.elements__template', () => {
      const image = new PopupWithImage(card, imageFullSize);
      image.setEventListeners();
      image.open();
    });
    initial.addItem(card.create());
  }
}, cardPosition);

//Отрисовка начального массива картинок
initial.renderItems();
