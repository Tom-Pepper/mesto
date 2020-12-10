import '../pages/index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupConfirmAction } from "../components/PopupConfirmAction.js";

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
  imageFullSize,
  deletePopup,
  editAvatarPopup,
  formEditAvatar,
  avatarChangeButton
} from "../utils/constants.js";

// Создание объекта для карточки- превьюхи
const imagePreview = new PopupWithImage(imageFullSize);
imagePreview.setEventListeners();

// Создание объекта карточки
function createCard(values, selector, api) {
  const card = new Card( values, selector, () => imagePreview.open(card),
    () => confirmDeletePopup.open(card), api);
  return card.create(currentUser.getId());
}

// Валидация поп-апов профиля, добавления карточки, обновления аватарки
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();
const editAvatarForm = new FormValidator(validationObj, formEditAvatar);
editAvatarForm.enableValidation();

//------------------------------------------------------------------------
//----------------------------API-----------------------------
//------------------------------------------------------------------------

//Функция возврата текста ошибки для catch'a
export function catchError(err) {
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

//Кнопка редактирования профиля (обработчик клика)
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
      renderer: (item) => cardsSection.addItem(
        createCard({
          name: item.name,
          link: item.link,
          id: item._id,
          likes: item.likes,
          owner: { _id: item.owner._id }
        }, '.elements__template', api), true)}, cardPosition);
    cardsSection.renderItems();

//Добавление новой карточки
    const placePopup = new PopupWithForm({
      popup: addPlacePopup,
      submitFormCallback: (event, values) => {
        event.preventDefault();
        api.addNewCard(values['place-name'], values['place-link'])
          .then((res) => {
            const newCard = createCard(
              {
                name: values['place-name'],
                link: values['place-link'],
                id: res._id,
                owner: {
                  _id: currentUser.getId()
                }
              }, '.elements__template', api);
            cardsSection.addItem(newCard, false);
            placePopup.close();
          })
          .catch(err => catchError(err));
      }
    });
    placePopup.setEventListeners();

//Кнопка добавления новой карточки (обработчик клика)
    buttonAddPlace.addEventListener('click', () => {
      newPlaceForm.clearErrors(addPlacePopup);
      placePopup.open();
    });
  })
  .catch(err => catchError(err));

//Удаление карточки с сервера
const confirmDeletePopup = new PopupConfirmAction(deletePopup, card => {
  api.deleteCard(card.getId())
    .then(() => {
      card._content.remove();
      card._content = null;
    })
    .catch(err => catchError(err));
  confirmDeletePopup.close();
});
confirmDeletePopup.setEventListeners();

//Изменение аватарки
const editAvatar = new PopupWithForm({
  popup: editAvatarPopup,
  submitFormCallback: (event, value) => {
    event.preventDefault();
    api.uploadAvatar(value['avatar'])
      .then(() => {
        currentUser.setUserAvatar(value['avatar']);
        editAvatar.close();
      })
      .catch(err => catchError(err));
  }
});
editAvatar.setEventListeners();

//Обработчик кнопки редактирования аватара
avatarChangeButton.addEventListener('click', () => {
  editAvatarForm.clearErrors(editAvatarPopup);
  editAvatar.open();
})
