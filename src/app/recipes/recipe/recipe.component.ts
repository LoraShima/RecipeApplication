import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RouterLink } from '@angular/router';

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
