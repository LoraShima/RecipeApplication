import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private router = inject(Router);
  onHeaderClick(): void {
    this.router.navigate(['/recipes'], { queryParams: { tag: null, mealType: null } });
  }
}
