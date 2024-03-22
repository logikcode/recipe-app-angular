import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

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

  sendAuthLoginRequest(email: string, password: string) {
    return this.httpClient
      .post<AuthenticationResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCITeSrQ7bOYrcUr_vpOQhYc5ZhGMLfbKE', {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
