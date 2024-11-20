import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipesServices {
  data = [];

  private httpClient = inject(HttpClient);

  loadAvailableRecipes() {
    return this.httpClient.get('https://dummyjson.com/recipes');
  }

  loadSelectedRecipeById(id: string) {
    //console.log(`https://dummyjson.com/recipes/${id}`)
    //works correctly ^
    return this.httpClient.get(`https://dummyjson.com/recipes/${id}`);
    
  }

  loadNeededRecipe(name: string) {
    return this.httpClient.get(
      'https://dummyjson.com/recipes/search?q=' + name
    );
  }

  loadAvailableTags() {
    //HttpClient.get() in Angular always returns an observable.
    return this.httpClient.get('https://dummyjson.com/recipes/tags');
  }

  loadRecipesByTag(name: string) {
    return this.httpClient.get('https://dummyjson.com/recipes/tag/' + name);
  }

  loadRecipesByMeal(name: string) {
    return this.httpClient.get(
      'https://dummyjson.com/recipes/meal-type/' + name
    );
  }

  // pipe -> modifies the observable stream before it is emitted
  // pipe -> allows chaining RXJS operators to obs. to process the response data
  // map -> takes the response and applies a transformation(getting the length)
  //will return an pbservable that emits the count of recipes
  numberOfRecipesByMeal(name: string) {
    return this.loadRecipesByMeal(name).pipe(
      map((response: any) => {
        return response.recipes.length;
      })
    );
  }
}
