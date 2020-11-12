import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor() {
    super();
  }

  open() {
    super.open();

  }
}

//
// const openImage = (data) => {
//   fullSizePhoto.src = data.link;
//   fullSizePhoto.alt = data.name;
//   imageFullSizeTitle.innerText = data.name;
//   // popupToggle(imageFullSize);
// }
