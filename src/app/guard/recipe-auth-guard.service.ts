import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../auth/authentication.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipeAuthGuardService implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authenticationService.userSubject
      .pipe(
        take(1), // avoiding ongoing listening to the observable which can lead to bug
        map(user => {
          return !!user ? true : this.router.createUrlTree(['/login']);
        }));
  }

}
