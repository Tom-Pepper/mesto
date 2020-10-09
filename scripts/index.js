//Массив для вставки карточек при загрузке сайта
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus-mtn.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Карачаево- Черкессия',
    link: './images/karachaevo-cherkessia.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altay.jpg'
  },
  {
    name: 'Онежское озеро',
    link: './images/onezhskoe-ozero.jpg'
  }
];

const elemetnsTemplate = document.querySelector('.elements__template').content;
const elementsPoition = document.querySelector('.elements');

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const buttonClosePopup = popup.querySelector(".popup__close");

const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__name");
const jobInput = popup.querySelector(".popup__job");
const nameToEdit = document.querySelector(".profile__info-name");
const jobToEdit = document.querySelector(".profile__info-job");


//Открытие и закрытие поп-апа редактировния профиля
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
//------

//Изменение имени и профессии профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  popupClose();

  nameInput.value ='';
  jobInput.value ='';
}
formElement.addEventListener('submit', formSubmitHandler);
//------

