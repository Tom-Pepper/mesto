// Класс для профиля пользователя
export class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo({ name, job, id}) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._id = id;
  }

  getId() {
    return this._id;
  }

  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
