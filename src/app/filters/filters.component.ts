import { Component, inject, OnInit } from '@angular/core';
import { RecipesServices } from '../recipes.services';
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
