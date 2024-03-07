import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToServer() {
    this.router.navigate(['/servers', '1', 'edit'], {queryParams: {allowedEdit: '1'}, fragment: 'loading'});
  }
}
