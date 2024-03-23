import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthenticationService} from '../auth/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  subscription: Subscription;
  isAuthenticated = false;

  constructor(private datastoreService: DataStorageService, private authenticationService: AuthenticationService) {
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.subscription = this.authenticationService.userSubject
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSendToServer() {
    this.datastoreService.storeRecipes();
  }

  fetchRecipesFromServer() {
    this.datastoreService.fetchRecipesFromServer().subscribe();
  }
}
