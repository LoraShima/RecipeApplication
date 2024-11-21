import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesServices } from '../../recipes.services';
import { Recipe } from '../../recipe.model';
import { RecipeComponent } from "../recipe/recipe.component";

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  imports: [
    CommonModule,
    RecipeComponent
],
})
export class RecipesListComponent implements OnInit {
  //we console log the data we get form the API
  private recipesServices = inject(RecipesServices);
  private destroyRef = inject(DestroyRef);
  //selectedRecipe = false;

  recipes: Recipe[] = [];

  ngOnInit(): void {
    const subscription = this.recipesServices.loadAvailableRecipes().subscribe({
      next: (response: any) => {
        this.recipes = response.recipes;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Recipes loaded: ', this.recipes);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

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
