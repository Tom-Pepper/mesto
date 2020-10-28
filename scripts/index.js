//Переменные
const profileEditForm = document.forms['profile-edit'];
const addPlaceForm = document.forms['profile-add-place'];

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const addPlacePopup = document.querySelector(".popup-new-place");
const buttonClosePopup = popupEditProfile.querySelector(".popup__close");
const buttonCloseAddPlacePopup = document.querySelector(".popup-new-place__close");

const formElement = popupEditProfile.querySelector(".popup__form");
const nameInput = popupEditProfile.querySelector(".popup__name");
const jobInput = popupEditProfile.querySelector(".popup__job");
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
    popupToggle(imageFullSize);
  })
  return card;
}

// Функция очистки полей инпутов
 function clearInputs() {
  profileEditForm.reset();
  addPlaceForm.reset();
 }

//Изменение имени и "о себе" профиля
const submitProfileEditForm = (evt) => {
  evt.preventDefault();
  nameToEdit.textContent = nameInput.value;
  jobToEdit.textContent = jobInput.value;
  popupToggle(popupEditProfile);

  clearInputs();
}

//Функция добавления новой карточки
const addCardHandler = (evt) => {
  evt.preventDefault();
  const newPlace = createCard({
    name: placeDescInput.value,
    link: placeImgInput.value
  });
  cardPosition.prepend(newPlace);

  popupToggle(addPlacePopup);
}

// Функция открытия поп-апов
const popupToggle = (popup) => {
  const currentForm = popup.querySelector('.popup__form');
  if (currentForm) {
    const inputs = Array.from(currentForm.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      hideError(currentForm, input);
    })

    const submitButton = currentForm.querySelector('.popup__button');
    toggleButton(currentForm, submitButton, validationObj);
  }

  if (!popup.classList.contains('popup_is-opened')) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escKeyHandler);
  } else {
    document.removeEventListener('keydown', escKeyHandler);
    popup.classList.remove('popup_is-opened');
  }
}

// Закрытие поп-апов при клике по области вне модального окна
const closePopupLayerClick = (event) => {
  const currentModalWindow = event.currentTarget;
  if (event.target === currentModalWindow) {
    popupToggle(currentModalWindow);
  }
}

// Закрытие поп-апов по кнопке Escape
function escKeyHandler(evt) {
  if (evt.key === 'Escape') {
    popupToggle(evt.currentTarget.querySelector('.popup_is-opened'));
  }
}

// Слушатель. Открытие поп-апа редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = nameToEdit.textContent;
  jobInput.value = jobToEdit.textContent;

  const profileButton = popupEditProfile.querySelector('.popup__button');
  profileButton.removeAttribute('disabled');
  profileButton.classList.remove('popup__button_disabled');
  popupToggle(popupEditProfile);
});

//Слушатели закрытия модалок при клике по оверлею
addPlacePopup.addEventListener('click', closePopupLayerClick);
imageFullSize.addEventListener('click', closePopupLayerClick);
popupEditProfile.addEventListener('click', closePopupLayerClick);

// Слушатели закрытия модалок по клику на кнопку- крест
buttonCloseAddPlacePopup.addEventListener('click',() => popupToggle(addPlacePopup));
buttonClosePopup.addEventListener('click', () => popupToggle(popupEditProfile) );
fullSizeCloseButton.addEventListener('click', () => popupToggle(imageFullSize));

// Слушатель открытия окна добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  addPlaceForm.reset();
  popupToggle(addPlacePopup)
});

// Слушатели отправки форм по нажатию кнопки в модалке (сохранение изменений в профиле и добавление карточки)
formElement.addEventListener('submit', submitProfileEditForm);
formAddPlace.addEventListener('submit', addCardHandler);

renderCards();
