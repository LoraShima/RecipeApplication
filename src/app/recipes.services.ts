import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipesServices {
  data = [];

  private httpClient = inject(HttpClient);

  private route: string = 'https://dummyjson.com/recipes/';

  loadAvailableRecipes() {
    return this.httpClient.get(this.route);
  }

  loadRecipesBySearch(name: string){
    return this.httpClient.get(`${this.route}search?q=${name}`);
  }

  loadSelectedRecipeById(id: string) {
    return this.httpClient.get(this.route + id);
  }

  loadNeededRecipe(name: string) {
    return this.httpClient.get(this.route + name);
  }

  loadAvailableTags() {
    //HttpClient.get() in Angular always returns an observable.
    return this.httpClient.get(`${this.route}tags`);
  }

  loadRecipesByTag(name: string) {
    return this.httpClient.get(`${this.route}tag/${name}`);
  }

  loadRecipesByMeal(name: string) {
    return this.httpClient.get(`${this.route}meal-type/${name}`);
  }

  numberOfRecipesByMeal(name: string) {
    return this.loadRecipesByMeal(name).pipe(
      map((response: any) => {
        return response.recipes.length;
      })
    );
  }
}
