import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../recipe.model';
import { RecipesServices } from '../recipes.services';
import { CommonModule } from '@angular/common';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RecipeComponent, CommonModule],
})
export class RecipesComponent implements OnInit {
  //we console log the data we get form the API
  private recipesServices = inject(RecipesServices);
  private destroyRef = inject(DestroyRef);

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
