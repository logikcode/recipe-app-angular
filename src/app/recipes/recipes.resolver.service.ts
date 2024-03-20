import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Observable} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {Injectable} from '@angular/core';
import {RecipesService} from './recipes.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataLoadingService: DataStorageService, private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const fetchedRecipes = this.recipesService.getRecipes();
    if (fetchedRecipes.length !== 0) {
      return fetchedRecipes;
    }
    return this.dataLoadingService.fetchRecipesFromServer();
  }
}
