import { Component } from "@angular/core";
import { RecipeComponent } from "./recipe/recipe.component";

@Component({
    selector: 'app-recipes',
    standalone: true,
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
    imports: [RecipeComponent]
})

export class RecipesComponent{

}