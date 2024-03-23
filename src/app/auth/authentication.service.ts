import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from '../model/user.model';
import {Router} from '@angular/router';

export interface AuthenticationResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

interface ParsedUserData {

  email: string;
  userId: string;
  _userToken: string;
  _tokenExpiration: string;

}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  userSubject = new BehaviorSubject<User>(null);
  expirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  sendSignUpRequest(email: string, password: string) {
    return this.httpClient
      .post<AuthenticationResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCITeSrQ7bOYrcUr_vpOQhYc5ZhGMLfbKE', {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => {
        this.handleSuccessfulAuthentication(responseData);
      }));
  }

  signInRequest(email: string, password: string) {
    return this.httpClient.post<AuthenticationResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCITeSrQ7bOYrcUr_vpOQhYc5ZhGMLfbKE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => {
      this.handleSuccessfulAuthentication(responseData);
      this.router.navigate(['/recipes']);
    }));
  }

  parseLoginDetails() {
    const userData: ParsedUserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    // console.log(userData);

    const user = new User(userData.email, userData.userId, userData._userToken, new Date(userData._tokenExpiration));
    console.log(userData);
    if (user.userToken) {

      console.log(user);
      this.userSubject.next(user);
      this.autoExpireUserDetailsAfterSetTime(this.calculateAuthValidityTime(userData));
    }
  }

  handleSuccessfulAuthentication(authenticationResponseData: AuthenticationResponseData) {
    const expirationDate = new Date(new Date().getTime() + +authenticationResponseData.expiresIn * 1000);
    const user = new User(authenticationResponseData.email, authenticationResponseData.localId, authenticationResponseData.idToken,
      expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    this.userSubject.next(user);
    this.autoExpireUserDetailsAfterSetTime(+authenticationResponseData.expiresIn * 1000);

  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    console.log(errorResponse);
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Email / password is incorrect';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Email / password is incorrect';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email / password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.router.navigate(['/login']);
  }

  autoExpireUserDetailsAfterSetTime(expirationTime: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  calculateAuthValidityTime(userData: ParsedUserData) {
    const futureRemainingMillis = new Date(userData._tokenExpiration).getTime();
    const currentTimeInMillis = new Date().getTime();
    return futureRemainingMillis - currentTimeInMillis;
  }
}
