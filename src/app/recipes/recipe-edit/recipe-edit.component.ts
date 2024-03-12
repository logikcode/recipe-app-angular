import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipesService, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      console.log(this.editMode);
      this.initRecipeForm();
    });
  }

  initRecipeForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // in edit mode check if the recipe already have ingredients
      if (recipe['ingredients']) {
        for (const ingr of recipe.ingredients) {
          recipeIngredients.push(new FormGroup(
            {
              'ingredientName': new FormControl(ingr.ingredientName, Validators.required),
              'ingredientAmount': new FormControl(ingr.ingredientAmount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }
          ));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipeName, Validators.required),
      'recipeImagePath': new FormControl(recipeImagePath, Validators.required),
      'recipeDescription': new FormControl(recipeDescription, Validators.required),
      'recipeIngredients': recipeIngredients
    });

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients'))
      .push(new FormGroup({
        'ingredientName': new FormControl(null, Validators.required),
        'ingredientAmount': new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
  }

  onSubmit() {
// https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg
    const lastIndex = +this.recipeService.getRecipes().length - 1;
    const newRecipe = new Recipe(
      lastIndex,
      this.recipeForm.value['recipeName'],
      this.recipeForm.value['recipeDescription'],
      this.recipeForm.value['recipeImagePath'],
      this.recipeForm.value['recipeIngredients']);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.navigateToHome();


    } else {
      this.recipeService.addRecipe(newRecipe);
      this.navigateToHome();
    }
  }

  doLog() {
    console.log(this.recipeForm.value['recipeName']),
      console.log(this.recipeForm.value['recipeDescription']),
      console.log(this.recipeForm.value['recipeImagePath']),
      console.log(this.recipeForm.value['recipeIngredients']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  onClearForm(ingredientIndex) {
    console.log('Recipe Ingredient Index to Remove ' + ingredientIndex);
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(ingredientIndex);
  }
}
