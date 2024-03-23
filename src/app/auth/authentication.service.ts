import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthenticationResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {
  }

  sendSignUpRequest(email: string, password: string) {
    return this.httpClient
      .post<AuthenticationResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCITeSrQ7bOYrcUr_vpOQhYc5ZhGMLfbKE', {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occurred';
      console.log(errorResponse);
      console.log(errorResponse.error);
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': errorMessage = 'This email already exist';
        }
        return throwError(errorMessage);

      }));
  }
}
