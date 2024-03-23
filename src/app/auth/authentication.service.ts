import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from '../model/user.model';

export interface AuthenticationResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  userSubject = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
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
    }));
  }

  handleSuccessfulAuthentication(authenticationResponseData: AuthenticationResponseData) {
    const expirationDate = new Date(new Date().getTime() + +authenticationResponseData.expiresIn * 1000);
    const user = new User(authenticationResponseData.email, authenticationResponseData.localId, authenticationResponseData.idToken,
      expirationDate);
    this.userSubject.next(user);
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
}
