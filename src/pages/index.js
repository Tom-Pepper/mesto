import '../pages/index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import {
  validationObj,
  buttonEditProfile,
  buttonAddPlace,
  popupEditProfile,
  addPlacePopup,
  formElement,
  nameInput,
  jobInput,
  nameToEdit,
  jobToEdit,
  profileAvatar,
  formAddPlace,
  cardPosition,
  imageFullSize
} from "../utils/constants.js";

// Создание объекта для карточки- превьюхи
const imagePreview = new PopupWithImage(imageFullSize);
imagePreview.setEventListeners();

// Создание объекта карточки
function createCard(values, selector) {
  const card = new Card( values, selector, () => imagePreview.open(card));
  return card;
}

// Создание объекта поп-апа добавления карточки (места)
// const placePopup = new PopupWithForm(
//   {
//     popup: addPlacePopup,
//     submitFormCallback: (event, values) => {
//       event.preventDefault();
//       const newPlace = createCard({
//         name: values['place-name'],
//         link: values['place-link']
//       }, '.elements__template');
//       cardsSection.addItem(newPlace.create(), false);
//       placePopup.close();
//     }
//   }
// );
// placePopup.setEventListeners();

// Валидация поп-апов профиля и добавления карточки
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();

// Кнопка добавления новой карточки
// buttonAddPlace.addEventListener('click', () => {
//   newPlaceForm.clearErrors(addPlacePopup);
//   placePopup.open();
// });

//------------------------------------------------------------------------
//----------------------------API-----------------------------
//------------------------------------------------------------------------

//Функция возврата текста ошибки для catch'a
function catchError(err) {
  return `Что-то пошло не так. Ошибка: ${err.status}. ${err.message}`;
}

// Объект с токеном и URL для доступа к серверу
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: "36f02e32-425e-4cd6-9a5e-ab45df68f83b",
    "Content-Type": "application/json"
  }
});

//Начальные данные пользователя
const currentUser = new UserInfo({
  name: nameToEdit,
  job: jobToEdit,
  avatar: profileAvatar
});

//Берем данные пользователя и все карточки с сервера, и внутри этого промиса вся логика по созданию карточек,
//редактированию профиля и т.д.
api.getInitialData()
  .then(data => {
    const [userInfo, cards] = data;

    currentUser.setUserInfo({
      name: userInfo.name,
      job: userInfo.about,
      id: userInfo._id,
    })
    currentUser.setUserAvatar(userInfo.avatar);

    const profilePopup = new PopupWithForm(
      {
        popup: popupEditProfile,
        submitFormCallback: (event, values) => {
          event.preventDefault();
          api.editProfile(values['profile-name'], values['profile-job'])
            .then(() => {
              currentUser.setUserInfo({
                name: values['profile-name'],
                job: values['profile-job']
              });
              profilePopup.close();
            })
            .catch(err => catchError(err));
        }
      }
    );
    profilePopup.setEventListeners();

//Слушатель кнопки редактирования профиля
    buttonEditProfile.addEventListener('click', () => {
      const profileInfo = currentUser.getUserInfo();
      nameInput.value = profileInfo.name;
      jobInput.value = profileInfo.job;
      editProfileForm.clearErrors(popupEditProfile);
      profilePopup.open();
    });

//Отрисовка массива карточек с сервера
    const cardsSection = new Section({
      items: cards,
      renderer: (array) => {
        const card = createCard({
          name: array.name,
          link: array.link,
        }, '.elements__template')
        cardsSection.addItem(card.create(), true);
      }
    }, cardPosition);
    cardsSection.renderItems();

//Добавление новой карточки
    const placePopup = new PopupWithForm({
      popup: addPlacePopup,
      submitFormCallback: (event, values) => {
        event.preventDefault();
        api.addNewCard(values['place-name'], values['place-link'])
          .then(cards => {
            const newCard = createCard(
              {
                name: values['place-name'],
                link: values['place-link'],
                id: cards._id,
                owner: currentUser.getId()
              },
              '.elements__template');
            cardsSection.addItem(newCard.create(),
              false);
            placePopup.close();
          })
          .catch(err => catchError(err));
      }
    });
    placePopup.setEventListeners();

// Кнопка добавления новой карточки
    buttonAddPlace.addEventListener('click', () => {
      newPlaceForm.clearErrors(addPlacePopup);
      placePopup.open();
    });
  })
  .catch(err => catchError(err));
