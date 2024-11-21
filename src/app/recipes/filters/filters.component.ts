import { Component, inject, OnInit } from '@angular/core';
import { RecipesServices } from '../../recipes.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  recipesServices = inject(RecipesServices);
  tagsAvailable: string[] = [];
  tagsNeeded: string[] = ['Greek', 'Pakistani', 'Italian', 'Korean'];
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
    //this.fetchTags();
    this.recipesServices.loadAvailableTags().subscribe({
      next: (tags: any) => {
        this.tagsAvailable = tags;
        console.log(this.tagsAvailable);
      },
      error: (error) => {
        console.error(error);
      },
    });

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
