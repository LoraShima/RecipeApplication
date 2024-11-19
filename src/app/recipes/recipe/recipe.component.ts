import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RecipesServices } from '../../recipes.services';
import { Recipe } from '../../recipe.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent{

  @Input() recipe?: Recipe;
}
