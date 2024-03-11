import {Component, OnInit} from '@angular/core';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingService.getShoppingList();
    this.shoppingService.ingredientItem.subscribe(updatedIngredients => {
      this.ingredients = updatedIngredients;
    });
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingService.ingredientItem.subscribe(updatedIngredients => {
      this.ingredients = updatedIngredients;
    });
  }

  onShoppingItem(i: number) {
    this.shoppingService.startedEditingIngredient.next(i);
  }
}
