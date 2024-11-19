import { Component, DestroyRef, OnInit, inject} from '@angular/core';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../recipe.model';
import { RecipesServices } from '../recipes.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RecipeComponent, CommonModule],
})
export class RecipesComponent implements OnInit {
  //we console log the data we get form the API
  recipesServices = inject(RecipesServices);
  recipes: Recipe[] = [];

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.recipesServices.loadAvailableRecipes().subscribe({
      next: (response: any) => {
        //console.log(recipe);
        this.recipes = response.recipes;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        //this.onSelectedRecipe(); WORKS
        //this.onRecipeByTag(); WORKS
        //this.onAvailableTags(); //WORKS
        //this.onRecipeByMeal(); WORKS
        console.log('Recipes loaded: ', this.recipes);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}

// onSelectedRecipe() {
//   const subscription = this.recipesServices
//     .loadNeededRecipe('Margherita')
//     .subscribe({
//       next: (resData) => {
//         console.log(resData);
//       },
//     });
// }

// onRecipeByTag() {
//   const subscription = this.recipesServices
//     .loadRecipesByTag('Pakistani')
//     .subscribe({
//       next: (resData) => {
//         console.log(resData);
//       },
//     });
// }

// onRecipeByMeal() {
//   const subscription = this.recipesServices
//     .loadRecipesByMeal('snack')
//     .subscribe({
//       next: (resData) => {
//         console.log(resData);
//       },
//     });
// }

// onAvailableTags() {
//   const subscription = this.recipesServices
//   .loadAvailableTags()
//   .subscribe({
//     next: (resData) => {
//       console.log(resData);
//     },
//   });
// }
