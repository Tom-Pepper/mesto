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
//------

//Первичная загрузка карточек из массива на главную страницу
const cardTemplate = document.querySelector('.elements__template');
const cardPosition = document.querySelector('.elements');

const renderCards = () => {
  const cards = initialCards.map(initialCard => getCard(initialCard));
  cardPosition.append(...cards);
}

const getCard = (data) => {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.element__title').innerText = data.name;
  card.querySelector('.element__image').src = data.link;
  card.querySelector('.element__like-button').addEventListener('click', function (evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle('element__like-button_active');
  })

  return card;
}
//------

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const addPlacePopup = document.querySelector(".popup-new-place");
const buttonClosePopup = popup.querySelector(".popup__close");
const buttonCloseAddPlacePopup = document.querySelector(".popup-new-place__close");

const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__name");
const jobInput = popup.querySelector(".popup__job");
const nameToEdit = document.querySelector(".profile__info-name");
const jobToEdit = document.querySelector(".profile__info-job");


//Открытие и закрытие поп-апа редактировния профиля
const profilePopupOpen = () =>  {
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;
  popup.classList.add("popup_is-opened");
}

const profilePopupClose = () =>  {
  popup.classList.remove("popup_is-opened");
}

const closePopupLayerClick = (event) => {
  if (event.target === event.currentTarget) {
    profilePopupClose();
  }
}
buttonEditProfile.addEventListener('click', profilePopupOpen);
buttonClosePopup.addEventListener('click', profilePopupClose);
popup.addEventListener('click', closePopupLayerClick);
//------

//Изменение имени и профессии профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  profilePopupClose();

  nameInput.value ='';
  jobInput.value ='';
}
formElement.addEventListener('submit', formSubmitHandler);
//------

//Открытие и закрытие поп-апа добавления новых карточек
const addPlacePopupOpen = () => {
  addPlacePopup.classList.add("popup_is-opened");
}
const addPlacePopupClose = () => {
  addPlacePopup.classList.remove("popup_is-opened");
}
const addPLacePopupLayerClickClosure = (event) => {
  if (event.target === event.currentTarget) {
    addPlacePopupClose();
  }
}
buttonAddPlace.addEventListener('click', addPlacePopupOpen);
buttonCloseAddPlacePopup.addEventListener('click', addPlacePopupClose);
addPlacePopup.addEventListener('click', addPLacePopupLayerClickClosure);
//------

renderCards();
