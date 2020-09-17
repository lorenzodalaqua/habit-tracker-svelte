export default class User {
  constructor({ auth, habits = [], settings = {} }) {
    this.auth = auth;
    this.habits = habits;
    this.settings = settings;
  }
}
