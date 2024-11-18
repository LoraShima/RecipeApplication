import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../recipe.model';
import { RecipesServices } from '../recipes.services';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RecipeComponent],
})
export class RecipesComponent implements OnInit {
  //we console log the data we get form the API
  recipesServices = inject(RecipesServices);
  recipe = signal<Recipe[] | undefined>(undefined);
  isFetching = signal<boolean>(false);

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);

    const subscription = this.recipesServices.loadAvailableRecipes().subscribe({
      next: (recipe) => {
        console.log(recipe);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.onSelectedRecipe();
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectedRecipe() {
    const subscription = this.recipesServices
      .loadNeededRecipe('Margherita')
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });
  }
}
