import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;
  constructor(private currentRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      id: this.currentRoute.snapshot['id'],
      name: this.currentRoute.snapshot['name']
    };
    this.currentRoute.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      // this.user.name = params['name'];
    });
  }

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }
}
