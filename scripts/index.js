let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");

function popupToggle()  {
  popup.classList.toggle("popup_is-opened");
}

buttonEditProfile.addEventListener('click', popupToggle);
buttonClosePopup.addEventListener('click', popupToggle);
