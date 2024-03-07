import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  goToServer() {
    this.router.navigate(['/servers', '1', 'edit'], {queryParams: {allowedEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
  this.authService.login();
  }

  onLogOut() {
  this.authService.logout();
  }
}
