//Массив для вставки карточек при загрузке сайта
const initialCards = [
  {
    name: 'Остров Ольхон',
    link: './images/olkhon-island.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus-mtn.jpg'
  },
  {
    name: 'Магадан',
    link: './images/magadan.jpg'
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
//Переменные
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

const formAddPlace = addPlacePopup.querySelector('.popup-new-place__form');
const placeDescInput = addPlacePopup.querySelector('.popup-new-place__description');
const placeImgInput = addPlacePopup.querySelector('.popup-new-place__image-link');

const cardTemplate = document.querySelector('.elements__template');
const cardPosition = document.querySelector('.elements');

const imageFullSize = document.querySelector('.popup-image');
const fullSizeCloseButton = imageFullSize.querySelector('.popup-image__close');
const fullSizePhoto = imageFullSize.querySelector('.popup-image__preview');
const imageFullSizeTitle = imageFullSize.querySelector('.popup-image__title');

//Первичная загрузка карточек из массива на главную страницу
const renderCards = () => {
  const cards = initialCards.map(initialCard => createCard(initialCard));
  cardPosition.append(...cards);
}
// Функция добавления карточки, включая работоспособность кнопки лайка и удаления конкретной карточки, открытия
// изображения при клике по фото
const createCard = (data) => {
  const card = cardTemplate.content.cloneNode(true);
  const elementImage = card.querySelector('.element__image');
  card.querySelector('.element__title').innerText = data.name;
  elementImage.src = data.link;
  elementImage.alt = data.name;
  card.querySelector('.element__like-button').addEventListener('click', (evt) => {
    const likeTarget = evt.target;
    likeTarget.classList.toggle('element__like-button_active');
  })
  card.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    const deleteTarget = evt.target;
    deleteTarget.closest('.element').remove();
  })
  elementImage.addEventListener('click', () => {
    fullSizePhoto.src = data.link;
    fullSizePhoto.alt = data.name;
    imageFullSizeTitle.innerText = data.name;
    popupOpen(imageFullSize);
  })
  return card;
}

//Изменение имени и профессии профиля
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  popupClose();

  nameInput.value ='';
  jobInput.value ='';
}

//Функция добавления новой карточки
const addCardHandler = (evt) => {
  evt.preventDefault();
  const newPlace = createCard({
    name: placeDescInput.value,
    link: placeImgInput.value
  });
  cardPosition.prepend(newPlace);

  popupClose();

  placeDescInput.value = '';
  placeImgInput.value = '';
}

//Открытие поп-апа редактировния профиля
const profilePopupOpen = () =>  {
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;
  // popup.classList.add("popup_is-opened");
  popupOpen(popup);
}
//Открытие поп-апов
const popupOpen = (popup) => {
  popup.classList.add("popup_is-opened");
}

//Закрытие поп-апов
const popupClose = () =>  {
  popup.classList.remove("popup_is-opened");
  imageFullSize.classList.remove('popup_is-opened');
  addPlacePopup.classList.remove("popup_is-opened");
}
//Закрытие поп-апов при клике по области вне модального окна
const closePopupLayerClick = (event) => {
  if (event.target === event.currentTarget) {
    popupClose();
  }
}

buttonEditProfile.addEventListener('click', profilePopupOpen);
buttonClosePopup.addEventListener('click', popupClose);
popup.addEventListener('click', closePopupLayerClick);

buttonAddPlace.addEventListener('click', () => popupOpen(addPlacePopup));
buttonCloseAddPlacePopup.addEventListener('click', popupClose);
addPlacePopup.addEventListener('click', closePopupLayerClick);
imageFullSize.addEventListener('click', closePopupLayerClick);

fullSizeCloseButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);
formAddPlace.addEventListener('submit', addCardHandler);
renderCards();
