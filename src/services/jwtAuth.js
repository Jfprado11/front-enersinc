import jwt_decode from 'jwt-decode';

import { refresh } from './authApi';

const tokenKey = 'testToken';

class AuthenticationManager {
  currentToken;
  _user = null;
  _userChangeReg = [];
  userChanged;

  constructor() {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      // token = localStorage.getItem(tokenKey);
      this._processToken(token);
    }
    window.addEventListener(
      'storage',
      (event) => {
        if (event.key === tokenKey) {
          let newToken = event.newValue;
          if (newToken) {
            newToken = JSON.parse(newToken);
          }

          this._processToken(newToken);
          this.tokenUpdated(newToken);
        }
      },
      false
    );

    setInterval(() => this.checkTokenExpiry(this), 300000);
  }

  tokenUpdated(newToken) {
    this.currentToken = newToken;
    if (this.userChanged) {
      this.userChanged(this);
    }
  }

  checkTokenExpiry(_this) {
    if (!_this) {
      _this = this;
    }
    if (_this._user != null) {
      refresh(_this.getRefreshToken())
        .then((newToken) => {
          console.log('refreshing');
          _this.updateToken(newToken);
        })
        .catch(() => {
          _this.updateToken(null);
          window.location.href = '/login';
        });
    }
    return Promise.resolve();
  }

  _processToken(token) {
    this.currentToken = token;
    this._user = null;
    try {
      this._user = jwt_decode(token);
    } catch (error) {
      console.log(error);
    }
  }

  static updateToken(token) {
    this.currentToken = token;
    if (token) {
      localStorage.setItem(tokenKey, JSON.stringify(token));
    } else {
      localStorage.removeItem(tokenKey);
    }
  }

  static getAccessToken() {
    const result = window.localStorage.getItem(tokenKey);
    if (!result) {
      return '';
    }
    return JSON.parse(result).access;
  }

  getRefreshToken() {
    let result = window.localStorage.getItem(tokenKey);
    if (!result) {
      return '';
    }
    return JSON.parse(result).refresh;
  }

  static logout() {
    this.updateToken(null);
  }
}

export default AuthenticationManager;
