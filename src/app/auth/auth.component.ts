import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authenticationService: AuthenticationService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuthForm(authenticationForm: NgForm) {
    console.log(authenticationForm.value);
    if (!authenticationForm.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {

    } else {
      this.authenticationService
        .sendAuthLoginRequest(authenticationForm.value.email, authenticationForm.value.password)
        .subscribe(data => {
          console.log(data);
          this.isLoading = false;
        }, errorResponse => {
          this.error = errorResponse;
          this.isLoading = false;

        });
    }
    authenticationForm.reset();
  }
}
