import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FiltersComponent } from './recipes/filters/filters.component';
import { SearchComponent } from './search/search.component';
import { RecipeInfoComponent } from './recipes/recipe-info/recipe-info.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { NgModel } from '@angular/forms';
//import { CommonModule } from "@angular/common";

@NgModule({
  providers: [provideHttpClient()],
  declarations: [AppComponent], //for non-standalone components
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    RecipesComponent,
    FiltersComponent,
    SearchComponent,
    RecipeInfoComponent,
    RouterModule.forRoot([
      { path: 'recipes', component: RecipesListComponent },
      { path: 'recipes/:id', component: RecipeInfoComponent },
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
      { path: '**', redirectTo: 'recipes', pathMatch: 'full' },
    ]),
    RouterOutlet
  ],
})
export class AppModule {}
