import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationResponseData, AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmitAuthForm(authenticationForm: NgForm) {
    let authenticationObservable: Observable<AuthenticationResponseData>;

    console.log(authenticationForm.value);
    if (!authenticationForm.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      authenticationObservable = this.authenticationService
        .signInRequest(authenticationForm.value.email, authenticationForm.value.password);
      this.router.navigate(['/recipes']);
    } else {
      authenticationObservable = this.authenticationService
        .sendSignUpRequest(authenticationForm.value.email, authenticationForm.value.password);
    }

    authenticationObservable.subscribe(data => {
      console.log(data);
      this.isLoading = false;
    }, errorResponse => {
      this.error = errorResponse;
      this.isLoading = false;

    });
    authenticationForm.reset();
  }
}
