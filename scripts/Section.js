// Класс для вставки и отрисовки картинок
export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._containter = container;
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containter.append(item);
  }
}
