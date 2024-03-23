import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  recipes: Recipe[];

  constructor(private httpClient: HttpClient, private recipesService: RecipesService,
              private authenticationService: AuthenticationService) {

  }

  storeRecipes() {
    this.recipes = this.recipesService.getRecipes();
    return this.httpClient.put('https://app-recipe-21494-default-rtdb.firebaseio.com/recipes.json', this.recipes)
      .subscribe(data => {
        console.log(data);
      });
  }

  fetchRecipesFromServer() {
    return this.fetchRecipesUsingTokenWithinInterceptor();
  }

  private fetchRecipeUsingParamTokenAuth() {
    return this.authenticationService.userSubject
      .pipe(take(1), // getting the value only one and not manually unsubscribe
        exhaustMap(user => { // exhaustMap collapse previouse observable to one in the observable chain
          return this.httpClient.get<Recipe[]>('https://app-recipe-21494-default-rtdb.firebaseio.com/recipes.json', {
            params: new HttpParams().set('auth', user.userToken)
          });
        }),
        map(recipes => {
          return recipes
            .map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
          this.recipesService.setRecipesFromServer(recipes);
        })
      );
  }

  fetchRecipesUsingTokenWithinInterceptor() {
    return this.httpClient.get<Recipe[]>('https://app-recipe-21494-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
          return recipes
            .map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
          this.recipesService.setRecipesFromServer(recipes);
        }));
  }
}
