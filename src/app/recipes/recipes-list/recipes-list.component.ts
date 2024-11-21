import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesServices } from '../../recipes.services';
import { Recipe } from '../../recipe.model';
import { RecipeComponent } from '../recipe/recipe.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  imports: [CommonModule, RecipeComponent, FormsModule],
})
export class RecipesListComponent implements OnInit {
  private recipesServices = inject(RecipesServices);
  private destroyRef = inject(DestroyRef);

  recipes: Recipe[] = [];
  filterValue: string = '';
  private dataService = inject(DataService);
  recipesByMeal: Recipe[] = [];

  ngOnInit(): void {
    this.recipesServices.loadAvailableRecipes().subscribe({
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

    this.dataService.filterValue$.subscribe((value) => {
      console.log('Filter value: ', value);
      this.filterValue = value;

      this.recipesServices.loadRecipesByMeal(this.filterValue).subscribe({
        next: (filteredResponse: any) => {
          console.log(
            'recipes-list, this.filterValue:',
            filteredResponse.recipes
          );
          this.recipesByMeal = filteredResponse.recipes;
          console.log('Filtered recipes by meal: ', this.recipesByMeal);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
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
