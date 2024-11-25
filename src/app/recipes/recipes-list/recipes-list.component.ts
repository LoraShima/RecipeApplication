import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesServices } from '../../recipes.services';
import { Recipe } from '../../recipe.model';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipesComponent } from '../recipes.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  imports: [RecipeComponent],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipesByTag: Recipe[] = [];
  recipesByMeal: Recipe[] = [];
  tag: string | null = null;
  mealType: string | null = null;

  private recipesServices = inject(RecipesServices);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Listen for changes in query parameters
    this.route.queryParams.subscribe((params) => {
      // Extract the tag and mealType from query params
      this.tag = params['tag'] || null;
      this.mealType = params['mealType'] || null;

      // Fetch recipes based on the tag and mealType
      this.loadRecipes();
    });
  }

  // Method to load recipes based on the selected tag or mealType
  loadRecipes(): void {
    // Reset the recipes arrays before fetching new data
    this.recipesByTag = [];
    this.recipesByMeal = [];

    // Load recipes based on the tag if it is selected
    if (this.tag) {
      this.recipesServices.loadRecipesByTag(this.tag).subscribe({
        next: (response: any) => {
          this.recipesByTag = response.recipes;
          console.log('Filtered recipes by tag: ', this.recipesByTag);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    // Load recipes based on the mealType if it is selected
    if (this.mealType) {
      this.recipesServices.loadRecipesByMeal(this.mealType).subscribe({
        next: (response: any) => {
          this.recipesByMeal = response.recipes;
          console.log('Filtered recipes by meal: ', this.recipesByMeal);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    // If no filters are applied, load all recipes
    if (!this.tag && !this.mealType) {
      this.recipesServices.loadAvailableRecipes().subscribe({
        next: (response: any) => {
          this.recipes = response.recipes;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}

