// Объявление переменных
let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");
let nameToEdit = document.querySelector(".profile__info-name");
let jobToEdit = document.querySelector(".profile__info-job");
// ------

// Открытие и закрытие поп-апа
const popupOpen = () =>  {
  popup.classList.add("popup_is-opened");
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;
}

const popupClose = () =>  {
  popup.classList.remove("popup_is-opened");
}

const closePopupLayerClick = (event) => {
  if (event.target === event.currentTarget) {
    popupClose();
  }
}

buttonEditProfile.addEventListener('click', popupOpen);
buttonClosePopup.addEventListener('click', popupClose);
popup.addEventListener('click', closePopupLayerClick);
// ------

let formElement = document.querySelector(".popup__form");
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);
