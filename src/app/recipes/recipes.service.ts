import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';

@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(0, 'A Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Onion', 5),
        new Ingredient('Sugar', 10)
      ]),
    new Recipe(1, 'Another  Recipe', 'This is simple recipe',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [
        new Ingredient('Maggi', 20),
        new Ingredient('Shakes', 4)
      ])
  ];

  constructor(private shoppingService: ShoppingService) {
  }

  getRecipes() {

    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.find(it => it.id === id);
  }
}
