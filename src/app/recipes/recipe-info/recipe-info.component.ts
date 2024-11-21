import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesServices } from '../../recipes.services';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-info',
  standalone: true,
  templateUrl: './recipe-info.component.html',
  styleUrl: './recipe-info.component.css',
  imports: [CommonModule],
})
export class RecipeInfoComponent implements OnInit {
  recipe: any;
  private recipesServices = inject(RecipesServices);
  private router = inject(ActivatedRoute);

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const recipeId = this.router.snapshot.paramMap.get('id');
    console.log('kot ' + recipeId); //we get it correctly
    if (recipeId) {
      const subscription = this.recipesServices
        .loadSelectedRecipeById(recipeId)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.recipe = response;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            subscription.unsubscribe();
          },
        });
    } else {
      console.log('Recipe name is null or undefined.');
    }
  }

  goBack() {
    window.history.back();	
  }
}
