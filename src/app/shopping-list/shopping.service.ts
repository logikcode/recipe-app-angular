import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingService {

  ingredientItem = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {
  }

  getShoppingList() {
    return this.ingredients.slice();
  }

  addShoppingIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientItem.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientItem.emit(this.ingredients.slice());
  }
}
