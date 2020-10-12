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

//Первичная загрузка карточек из массива на главную страницу
const renderCards = () => {
  const cards = initialCards.map(initialCard => getCard(initialCard));
  cardPosition.append(...cards);
}
//Функция доюавления карточки, включая работоспособность кнопки лайка и удаления конкретной карточки
const getCard = (data) => {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.element__title').innerText = data.name;
  card.querySelector('.element__image').src = data.link;
  card.querySelector('.element__image').alt = data.name;
  card.querySelector('.element__like-button').addEventListener('click', (evt) => {
    const likeTarget = evt.target;
    likeTarget.classList.toggle('element__like-button_active');
  })
  card.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    const deleteTarget = evt.target;
    deleteTarget.closest('.element').remove();
  })
  card.querySelector('.element__image').addEventListener('click', () => {
    imageFullSize.classList.add('popup_is-opened');
  })
  return card;
}

//Открытие поп-апа редактировния профиля
const profilePopupOpen = () =>  {
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;
  popup.classList.add("popup_is-opened");
}
//Закрытие поп-апа редактировния профиля
const profilePopupClose = () =>  {
  popup.classList.remove("popup_is-opened");
}
//Закрытие поп-апа ред. профиля при клике по области вне модального окна
const closePopupLayerClick = (event) => {
  if (event.target === event.currentTarget) {
    profilePopupClose();
  }
}

buttonEditProfile.addEventListener('click', profilePopupOpen);
buttonClosePopup.addEventListener('click', profilePopupClose);
popup.addEventListener('click', closePopupLayerClick);

//Изменение имени и профессии профиля
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  profilePopupClose();

  nameInput.value ='';
  jobInput.value ='';
}

formElement.addEventListener('submit', formSubmitHandler);

//Открытие поп-апа добавления новых карточек
const addPlacePopupOpen = () => {
  addPlacePopup.classList.add("popup_is-opened");
}
//Закрытие поп-апа добавления новых карточек
const addPlacePopupClose = () => {
  addPlacePopup.classList.remove("popup_is-opened");
}
//Закрытие поп-апа при клике по области вне модального окна
const addPLacePopupLayerClickClosure = (event) => {
  if (event.target === event.currentTarget) {
    addPlacePopupClose();
  }
}

buttonAddPlace.addEventListener('click', addPlacePopupOpen);
buttonCloseAddPlacePopup.addEventListener('click', addPlacePopupClose);
addPlacePopup.addEventListener('click', addPLacePopupLayerClickClosure);

//Функция добавления новой карточки
const addCard = (evt) => {
  evt.preventDefault();
    const newPlace = getCard({
      name: placeDescInput.value,
      link: placeImgInput.value
    });
    cardPosition.prepend(newPlace);

    addPlacePopupClose();

    placeDescInput.value = '';
    placeImgInput.value = '';
}
formAddPlace.addEventListener('submit', addCard);
renderCards();
