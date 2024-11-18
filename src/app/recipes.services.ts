import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesServices {
  private availableRecipes = signal<Recipe[]>([]);
  data = [];

  private httpClient = inject(HttpClient);

  loadAvailableRecipes() {
    // this.httpClient.get('https://dummyjson.com/recipes').subscribe((data: any) => {
    //   //console.log(data);
    //   this.availableRecipes.set(data);
    // });
    return this.httpClient.get('https://dummyjson.com/recipes');
  }

  loadNeededRecipe(name: string){
    return this.httpClient.get('https://dummyjson.com/recipes/search?q='+name);
  }

  loadAvailableTags(){
    return this.httpClient.get('https://dummyjson.com/recipes/tags');
  }

  loadRecipesByTag(name: string){
    return this.httpClient.get('https://dummyjson.com/recipes/tag/'+name);
  }

  loadRecipesByMeal(name: string){
    return this.httpClient.get('https://dummyjson.com/recipes/meal-type/'+name);
  }
}
