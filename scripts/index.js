let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");

const popupToggle = () =>  {
  popup.classList.toggle("popup_is-opened");
}

const closePopupLayerClick = (event) => {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}

buttonEditProfile.addEventListener('click', popupToggle);
buttonClosePopup.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopupLayerClick);
