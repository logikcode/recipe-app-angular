export class User {
  constructor(public email: string, public userId: string, private _userToken: string, private _tokenExpiration: Date) {
  }

  get userToken() {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }
    return this._userToken;
  }
}
