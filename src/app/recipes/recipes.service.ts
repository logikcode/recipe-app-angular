import {Recipe} from './recipe.model';
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';
import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable()
export class RecipesService implements OnInit {
  recipeSelected = new EventEmitter<Recipe>();
  recipeUpdated = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    // this.dataService.fetchRecipesFromServer();
  }


  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.sendRecipesCopy();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.sendRecipesCopy();
  }

  sendRecipesCopy() {
    this.recipeUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.sendRecipesCopy();

  }

  setRecipesFromServer(recipes: Recipe[]) {
    this.recipes = recipes;
    this.sendRecipesCopy();
  }
}
