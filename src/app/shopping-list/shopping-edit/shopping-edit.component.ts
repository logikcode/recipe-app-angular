import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output, OnDestroy
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  subscription: Subscription;
  onEditMode = false;
  editItemIndex: number;
  ingredient: Ingredient;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditingIngredient
      .subscribe(value => {
        this.onEditMode = true;
        this.editItemIndex = +value;
        this.ingredient = this.shoppingService.getIngredient(this.editItemIndex);
        this.ingredientForm.setValue({
          ingredientName: this.ingredient.name,
          ingredientAmount: this.ingredient.amount
        });
      });
  }

  onAddItem(ingredientForm: NgForm) {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const ingredientData = ingredientForm.value;
    console.log('Ingredients ', ingredientData);
    const newIngredient = new Ingredient(ingredientData.ingredientName, ingredientData.ingredientAmount);
    if (this.onEditMode) {
      this.shoppingService.updateIngredient(this.editItemIndex, newIngredient);
      this.ingredientForm.reset();
      return;
    }
    this.shoppingService.addShoppingIngredient(newIngredient);
    ingredientForm.reset();
    this.onEditMode = false;
  }

  onClear() {
    this.ingredientForm.reset();
    this.onEditMode = false;
  }
}
