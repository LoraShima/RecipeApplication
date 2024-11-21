import { Component, inject, NgModule, OnInit } from '@angular/core';
import { RecipesServices } from '../../recipes.services';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  imports: [FormsModule],
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
  }

  //SENDING THE FILTER VALUE FOR THE MEAL-TYPE
  filterValue: string = "";
  private dataService = inject(DataService);

  onFilterChanged(){
    this.dataService.setFilterValue(this.filterValue);
    console.log(this.filterValue); //is sent as a string //it is sent correctly
  }




  //   fetchTags(){
  //     this.recipesServices.loadAvailableTags().subscribe({
  //         next: (tags: any) => {
  //           this.tagsAvailable = tags;
  //           console.log(this.tagsAvailable);
  //         },
  //         error: (error) => {
  //           console.error(error);
  //         },
  //       });
  //     }
}
//we call it with the button
//   logTags(){
//     console.log(this.tagsAvailable);
//   }
