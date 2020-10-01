// Объявление переменных
let buttonEditProfile = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let buttonClosePopup = popup.querySelector(".popup__close");

let formElement = popup.querySelector(".popup__form");
let nameInput = popup.querySelector(".popup__name");
let jobInput = popup.querySelector(".popup__job");
let nameToEdit = document.querySelector(".profile__info-name");
let jobToEdit = document.querySelector(".profile__info-job");
// ------

// Открытие и закрытие поп-апа
const popupOpen = () =>  {
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;
  popup.classList.add("popup_is-opened");
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

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  popupClose();

  nameInput.value ='';
  jobInput.value ='';
}
formElement.addEventListener('submit', formSubmitHandler);
