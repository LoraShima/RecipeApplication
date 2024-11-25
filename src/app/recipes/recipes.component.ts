import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [
    CommonModule,
    FiltersComponent,
    RouterOutlet
],
})
export class RecipesComponent {}