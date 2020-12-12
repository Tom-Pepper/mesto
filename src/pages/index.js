import '../pages/index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupConfirmAction } from "../components/PopupConfirmAction.js";
import { PopupWithError } from "../components/PopupWithError.js";

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
  avatarChangeButton,
  saveChangesIsLoading,
  submitProfileOriginalText,
  addPlaceOriginalText,
  deleteOriginalText,
  deleteIsLoading,
  errorPopup,
  errorCloseButton
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

//Функция для отображения состояния загрузки (UX, лоадер)
function buttonLoader(isLoading, popup, loadingText, originalText) {
  const button = popup.querySelector('.popup__button');
  if(isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = originalText;
  }
}

//Объект поп-апа ошибки
const serverErrorPopup = new PopupWithError(errorPopup);
serverErrorPopup.setEventListeners();

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

//Начальные данные пользователя
const currentUser = new UserInfo({
  name: nameToEdit,
  job: jobToEdit,
  avatar: profileAvatar
});

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
              buttonLoader(false, popupEditProfile, saveChangesIsLoading, submitProfileOriginalText);
              profilePopup.close();
            })
            .catch(err => catchError(err.status));
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
            buttonLoader(false, addPlacePopup, saveChangesIsLoading, addPlaceOriginalText);
            placePopup.close();
          })
          .catch(err => catchError(err.status));
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
      card._content.remove();
      card._content = null;
      buttonLoader(false, deletePopup, deleteIsLoading, deleteOriginalText);
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
    buttonLoader(true, editAvatarPopup, saveChangesIsLoading, submitProfileOriginalText);
    api.uploadAvatar(value['avatar'])
      .then(() => {
        currentUser.setUserAvatar(value['avatar']);
        buttonLoader(false, editAvatarPopup, saveChangesIsLoading, submitProfileOriginalText);
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

// Валидация поп-апов профиля, добавления карточки, обновления аватарки
const editProfileForm = new FormValidator(validationObj, formElement);
editProfileForm.enableValidation();
const newPlaceForm = new FormValidator(validationObj, formAddPlace);
newPlaceForm.enableValidation();
const editAvatarForm = new FormValidator(validationObj, formEditAvatar);
editAvatarForm.enableValidation();
