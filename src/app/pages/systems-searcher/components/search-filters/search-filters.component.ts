import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent {
  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {
      'category-list': { display: false, rotation: false },
      'tag-list': { display: false, rotation: false },
      'state-list': { display: false, rotation: false },
      'algorithm-type-list': { display: false, rotation: false },
    };

  public toggle(id: string): void {
    this.toggleStates[id] = {
      display: !this.toggleStates[id].display,
      rotation: !this.toggleStates[id].rotation,
    };
  }
}
