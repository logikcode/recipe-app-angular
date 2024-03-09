import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param: Params) => {
      const id = +param['id'];
      this.recipe = this.recipeService.getRecipeById(id);
      console.log('ngOnInit for Recipe Detail Executed ' + id );
    });
    //
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   console.log('ngOnInit for Recipe Detail Executed');
    //   this.recipe = recipe;
    // });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
