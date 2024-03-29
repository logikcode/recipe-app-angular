import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;


  constructor(private recipeService: RecipesService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeUpdated.subscribe(recipes => {
      this.recipes = recipes;
    });
    console.log('Total recipes ' + this.recipes.length);
  }

  onNew() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute});

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
