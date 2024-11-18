import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { FiltersComponent } from "./filters/filters.component";
import { SearchComponent } from "./search/search.component";
import { RecipeInfoComponent } from "./recipe-info/recipe-info.component";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
    providers: [provideHttpClient()],
    declarations: [AppComponent], //for non-standalone components
    bootstrap: [AppComponent],
    imports: [BrowserModule, RecipesComponent, FiltersComponent, SearchComponent, RecipeInfoComponent],
})

export class AppModule{

}