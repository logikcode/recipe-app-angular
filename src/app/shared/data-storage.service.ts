import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  recipes: Recipe[];

  constructor(private httpClient: HttpClient, private recipesService: RecipesService) {

  }

  storeRecipes() {
    this.recipes = this.recipesService.getRecipes();
    return this.httpClient.put('https://app-recipe-21494-default-rtdb.firebaseio.com/recipes.json', this.recipes)
      .subscribe(data => {
        console.log(data);
      });
  }
}
