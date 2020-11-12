import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";

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

// Первичная загрузка карточек из массива на главную страницу cайта
const renderCards = () => {
  initialCards.forEach(item => {
    const card = new Card(item.name, item.link, '.elements__template', () => openImage(card));
    cardPosition.append(card.create('.elements'));
  });
}

//Функция добавления новой карточки
const addCardHandler = (evt) => {
  evt.preventDefault();
  const newPlace = new Card(placeDescInput.value, placeImgInput.value,'.elements__template',
    () => openImage(newPlace));
  cardPosition.prepend(newPlace.create());

  // popupToggle(addPlacePopup);
}

//Изменение имени и "о себе" профиля
const submitProfileEditForm = (evt) => {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  // popupToggle(popupEditProfile);
  profilePopup.close(popupEditProfile);

  profileEditForm.reset();
}

// Функция открытия и закрытия поп-апов
// const popupToggle = (popup) => {
//   if (!popup.classList.contains('popup_is-opened')) {
//     popup.classList.add('popup_is-opened');
//     document.addEventListener('keydown', escKeyHandler);
//   } else {
//     document.removeEventListener('keydown', escKeyHandler);
//     popup.classList.remove('popup_is-opened');
//   }
// }

// Функция открытия картинки карточки в полном размере
const openImage = (data) => {
  fullSizePhoto.src = data.link;
  fullSizePhoto.alt = data.name;
  imageFullSizeTitle.innerText = data.name;
  // popupToggle(imageFullSize);
}

// Закрытие поп-апов при клике по области вне модального окна
const closePopupLayerClick = (event) => {
  const currentModalWindow = event.currentTarget;
  if (event.target === currentModalWindow) {
    // popupToggle(currentModalWindow);
    profilePopup.close(currentModalWindow);
  }
}

// Закрытие поп-апов по кнопке Escape
// function escKeyHandler(evt) {
//   if (evt.key === 'Escape') {
//     popupToggle(evt.currentTarget.querySelector('.popup_is-opened'));
//   }
// }

// Слушатель. Открытие поп-апа редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;
  editProfileForm.clearErrors(popupEditProfile);
  // popupToggle(popupEditProfile);
  profilePopup.open();
});

// Слушатель открытия окна добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  addPlaceForm.reset();
  newPlaceForm.clearErrors(addPlacePopup);
  // popupToggle(addPlacePopup);
});

// Слушатели закрытия модалок при клике по оверлею
addPlacePopup.addEventListener('click', closePopupLayerClick);
imageFullSize.addEventListener('click', closePopupLayerClick);
popupEditProfile.addEventListener('click', closePopupLayerClick);

// Слушатели закрытия модалок по клику на кнопку- крест
// buttonCloseAddPlacePopup.addEventListener('click',() => popupToggle(addPlacePopup));
// buttonClosePopup.addEventListener('click', () => popupToggle(popupEditProfile) );
// fullSizeCloseButton.addEventListener('click', () => popupToggle(imageFullSize));

// Слушатели отправки форм по нажатию кнопки в модалке (сохранение изменений в профиле и добавление карточки)
formElement.addEventListener('submit', submitProfileEditForm);
formAddPlace.addEventListener('submit', addCardHandler);

const profilePopup = new Popup(popupEditProfile);
profilePopup.setEventListeners();

// Создание объектов форм в каждом поп-апе для валидации
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();

renderCards();
