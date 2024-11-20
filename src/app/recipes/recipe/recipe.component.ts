import { Component, inject, Input } from '@angular/core';
import { RecipesServices } from '../../recipes.services';
import { Recipe } from '../../recipe.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
  imports: [RouterLink],
})
export class RecipeComponent{

  @Input() recipe!: Recipe;
}
