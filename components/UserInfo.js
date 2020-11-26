// Класс для профиля пользователя
export class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._profile = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return this._profile;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
