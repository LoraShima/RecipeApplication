import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [FormsModule]
})

export class SearchComponent{
    
    searchValue: string = "";
    private router = inject(Router);
    onSearchChanged(value: string){
        console.log(value);  
        if (value) {
            // Navigate to '/recipes' with the search value as queryParams
            this.router.navigate(['/recipes'], {
              queryParams: { search: value },
            });
          } else {
            // If input is cleared, navigate to '/recipes' without search query
            this.router.navigate(['/recipes'], { queryParams: { search: null } });
          } 
      }
}
