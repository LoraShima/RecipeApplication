import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, map, Observable, reduce } from 'rxjs';
//import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesServices {
  //private availableRecipes = signal<Recipe[]>([]);
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
    //HttpClient.get() in Angular always returns an observable. 
    return this.httpClient.get('https://dummyjson.com/recipes/tags');
  }

  loadRecipesByTag(name: string){
    return this.httpClient.get('https://dummyjson.com/recipes/tag/'+name);
  }

  loadRecipesByMeal(name: string){
    return this.httpClient.get('https://dummyjson.com/recipes/meal-type/'+name);
  }

  // pipe -> modifies the observable stream before it is emitted
  // pipe -> allows chaining RXJS operators to obs. to process the response data
  // map -> takes the response and applies a transformation(getting the length)
  //will return an pbservable that emits the count of recipes
  numberOfRecipesByMeal(name: string){
    return this.loadRecipesByMeal(name).pipe(
      map((response: any) => {
        return response.recipes.length;
      })
    );
  }

}


