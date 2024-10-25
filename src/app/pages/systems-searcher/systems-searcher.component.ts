import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';

@Component({
  selector: 'app-systems-searcher',
  standalone: true,
  imports: [SearchBarComponent, SearchFiltersComponent],
  templateUrl: './systems-searcher.component.html',
  styleUrl: './systems-searcher.component.scss',
})
export class SystemsSearcherComponent {}
