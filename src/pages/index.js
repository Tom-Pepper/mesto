import '../pages/index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
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
  formAddPlace,
  cardPosition,
  deletePopup,
  editAvatarPopup,
  formEditAvatar,
  avatarChangeButton,
  saveChangesIsLoading,
  submitProfileOriginalText,
  addPlaceOriginalText,
  deleteOriginalText,
  deleteIsLoading,
  imagePreview,
  serverErrorPopup,
  currentUser
} from "../utils/constants.js";

import {
  buttonLoader
} from "../utils/utils.js";

// Создание объекта карточки
function createCard(values, selector, api) {
  const card = new Card( values, selector, () => imagePreview.open(card),
    () => confirmDeletePopup.open(card), api, catchError);
  return card.create(currentUser.getId());
}

//Функция возврата текста ошибки для catch'a
export function catchError(err) {
  serverErrorPopup.showError(`Что-то пошло не так. Ошибка "${err}". Перезагрузите страницу,
  или обратитесь в поддержку.`);
  serverErrorPopup.open();
}

// Объект с токеном и URL для доступа к серверу
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: "36f02e32-425e-4cd6-9a5e-ab45df68f83b",
    "Content-Type": "application/json"
  }
}, catchError);

//Тянем карточки и информацию пользователя с сервера, с помощью Promise.all
api.getInitialData()
  .then(data => {
    const [userInfo, cards] = data;

    //Начальные данные для профиля с сервера
    currentUser.setUserInfo({
      name: userInfo.name,
      job: userInfo.about,
      id: userInfo._id,
    })
    currentUser.setUserAvatar(userInfo.avatar);

    //Изменение данных профиля
    const profilePopup = new PopupWithForm(
      {
        popup: popupEditProfile,
        submitFormCallback: (event, values) => {
          event.preventDefault();
          buttonLoader(true, popupEditProfile, saveChangesIsLoading, submitProfileOriginalText);
          api.editProfile(values['profile-name'], values['profile-job'])
            .then(() => {
              currentUser.setUserInfo({
                name: values['profile-name'],
                job: values['profile-job']
              });
              profilePopup.close();
            })
            .catch(err => catchError(err.status))
            .finally(() => {
              buttonLoader(false, popupEditProfile, saveChangesIsLoading, submitProfileOriginalText);
            }
        )
        }
      }
    );
    profilePopup.setEventListeners();

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
        buttonLoader(true, addPlacePopup, saveChangesIsLoading, addPlaceOriginalText);
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
          .catch(err => catchError(err.status))
          .then(() => {
            buttonLoader(false, addPlacePopup, saveChangesIsLoading, addPlaceOriginalText);
          })
      }
    });
    placePopup.setEventListeners();

    //Обработчик кнопки редактирования данных профиля
    buttonEditProfile.addEventListener('click', () => {
      const profileInfo = currentUser.getUserInfo();
      nameInput.value = profileInfo.name;
      jobInput.value = profileInfo.job;
      editProfileForm.clearErrors(popupEditProfile);
      profilePopup.open();
    });

    //Обработчик нопки добавления новой карточки
    buttonAddPlace.addEventListener('click', () => {
      newPlaceForm.clearErrors(addPlacePopup);
      placePopup.open();
    });
  })
  .catch(err => catchError(err));

//Удаление карточки с сервера
const confirmDeletePopup = new PopupConfirmAction(deletePopup, card => {
  buttonLoader(true, deletePopup, deleteIsLoading, deleteOriginalText);
  api.deleteCard(card.getId())
    .then(() => {
      card.removeCard();
      confirmDeletePopup.close();
    })
    .catch(err => catchError(err))
    .finally(() => {
      buttonLoader(false, deletePopup, deleteIsLoading, deleteOriginalText);
    })
});
confirmDeletePopup.setEventListeners();

//Изменение аватарки
const editAvatar = new PopupWithForm({
  popup: editAvatarPopup,
  submitFormCallback: (event, value) => {
    event.preventDefault();
    buttonLoader(true, editAvatarPopup, saveChangesIsLoading, submitProfileOriginalText);
    api.uploadAvatar(value['avatar'])
      .then(() => {
        currentUser.setUserAvatar(value['avatar']);
        editAvatar.close();
      })
      .catch(err => catchError(err))
      .finally(() => {
        buttonLoader(false, editAvatarPopup, saveChangesIsLoading, submitProfileOriginalText);
      })
  }
});
editAvatar.setEventListeners();

//Обработчик кнопки редактирования аватара
avatarChangeButton.addEventListener('click', () => {
  editAvatarForm.clearErrors(editAvatarPopup);
  editAvatar.open();
})

// Валидация поп-апов профиля, добавления карточки, обновления аватарки
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();
const editAvatarForm = new FormValidator(validationObj, formEditAvatar);
editAvatarForm.enableValidation();
