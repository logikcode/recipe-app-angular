import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  genders: string[] = ['male', 'female'];
  signupForm: FormGroup;
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];

  defaultSubscription: string = this.subscriptions[1];
  defaultSecretQuestion = 'Pet';
  restrictedNames: string[] = ['Emmanuel', 'Oladipupo', 'Superuser'];

  constructor() {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required, this.checkRestrictedName.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email,
      ], this.checkForValidEmailAsyncValidator.bind(this)), /* impl of async custom validator added as the third argument*/
      'password': new FormControl(null, [Validators.required]),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([new FormControl('Playing chess')])
    });

    this.signupForm.setValue({
      'username': 'Manuel',
      'email': 'admin@gmail.com',
      'password': '',
      'gender': 'male',
      'hobbies': ['Dancing']
    });
    this.signupForm.valueChanges.subscribe(value => {
      console.log('Value of the form' + value); // listening to the value change event fired
    });

    this.signupForm.statusChanges.subscribe(value => {
      console.log('Status of the form' + value); // listening to the status event fired
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.patchValue({username: suggestedName});
    /* use signupForm.form.patchValue to set partial portion of the form of setValue to set value for the entire form */

  }

  addHobby() {
    const hobby = new FormControl(null, Validators.required);
    console.log('User hobby ' + hobby);
    (<FormArray>this.signupForm.get('hobbies')).push(hobby);
  }

  checkRestrictedName(control: FormControl): Observable<{ [nameIsRestricted: string]: boolean } | null> {
    return of(control.value).pipe(
      map(value => {
        if (this.restrictedNames.indexOf(value) !== -1) {
          return {'nameIsRestricted': true};
        }
        return null;
      })
    );
  }

  checkForValidEmailAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
