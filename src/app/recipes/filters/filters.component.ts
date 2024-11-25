import { Component, inject, NgModule, OnInit } from '@angular/core';
import { RecipesServices } from '../../recipes.services';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  imports: [FormsModule, RouterLink],
})
export class FiltersComponent implements OnInit {
  recipesServices = inject(RecipesServices);
  mealTypes: string[] = [
    'breakfast',
    'lunch',
    'dinner',
    'appetizer',
    'dessert',
    'snack',
    'beverage',
  ];
  numberOfMealTypes: number[] = [];
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  tag: string | null = null;

  ngOnInit() {
    for (let i = 0; i < this.mealTypes.length; i++) {
      this.recipesServices.numberOfRecipesByMeal(this.mealTypes[i]).subscribe({
        next: (count: number) => {
          // console.log(
          //   'number of ' + this.mealTypes[i] + ' recipes is: ' + count
          // );
          this.numberOfMealTypes[i] = count;
        },
      });
    }

    this.route.queryParams.subscribe((params) => {
      this.tag = params['tag'] || null; // Get the tag from query params

      if(this.tag){
        this.filterValue = '';
      }
    });
  }

  //SENDING THE FILTER VALUE FOR THE MEAL-TYPE
  filterValue: string = "";

  onFilterChanged(){
    this.router.navigate(['/recipes'], { queryParams: { mealType: this.filterValue, tag:null },
      queryParamsHandling: 'merge', // Merge the new params with the existing ones
      skipLocationChange: false // Don't skip location change so URL updates 
      }); 
      //redirect to recipes page with filter value
    console.log(this.filterValue); //is sent as a string //it is sent correctly
  }

}

