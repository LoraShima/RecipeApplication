import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesServices } from '../../recipes.services';
import { Recipe } from '../../recipe.model';
import { RecipeComponent } from '../recipe/recipe.component';

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
    this.route.queryParams.subscribe((params) => {
      this.tag = params['tag'] || null;
      this.mealType = params['mealType'] || null;

      this.loadRecipes();
    });
  }

  loadRecipes(): void {
    this.recipesByTag = [];
    this.recipesByMeal = [];

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

