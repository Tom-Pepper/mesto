// Класс для профиля пользователя
export class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const profile = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return profile;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
