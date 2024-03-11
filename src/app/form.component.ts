import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  enabledSubmit = true;
  @ViewChild('formData') signupForm: NgForm;
  defaultSecretQuestion = 'pet';
  answer = '';
  submitted = false;
  genders: string[] = ['male', 'female'];
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];
  userInfo = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  defaultSubscription: string = this.subscriptions[0];


  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({username: suggestedName});
    /* use signupForm.form.patchValue to set partial portion of the form of setValue to set value for the entire form */

  }

  onSubmit(formData: NgForm) {
    console.log(formData);
    console.log(formData.value);
    this.submitted = true;
    this.userInfo.username = this.signupForm.value.username;
    this.userInfo.email = this.signupForm.value.email;
    this.userInfo.secretQuestion = this.signupForm.value.secret;
    this.userInfo.answer = this.signupForm.value.questionAnswer;
    this.userInfo.gender = this.signupForm.value.gender;
  }
}
