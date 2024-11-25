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
          this.numberOfMealTypes[i] = count;
        },
      });
    }

    this.route.queryParams.subscribe((params) => {
      this.tag = params['tag'] || null;

      if(this.tag){
        this.filterValue = '';
      }
    });
  }

  filterValue: string = "";

  onFilterChanged(){
    this.router.navigate(['/recipes'], { queryParams: { mealType: this.filterValue, tag:null },
      queryParamsHandling: 'merge',
      skipLocationChange: false 
      }); 
    console.log(this.filterValue); 
  }

}

