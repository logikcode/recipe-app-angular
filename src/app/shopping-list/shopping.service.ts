import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingService {

  ingredientsEvent = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  startedEditingIngredient: Subject<number> = new Subject<number>();

  constructor() {
  }

  getShoppingList() {
    return this.ingredients.slice();
  }

  addShoppingIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsEvent.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsEvent.emit(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(position: number, updatedIngredient: Ingredient) {
    this.ingredients[position] = updatedIngredient;
    this.ingredientsEvent.emit(this.ingredients.slice());
  }

  deleteIngredient(ingredientIndex: number) {
    this.ingredients.splice(ingredientIndex, 1);
    this.ingredientsEvent.emit(this.ingredients.slice());
  }
}
