import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionComponent } from '../../../../shared/accordion/accordion/accordion.component';
import {
  ALGORITHMS,
  CATEGORIES,
  STATES,
} from '../../../../constants/search-filters.const';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent {
  public filters = [
    {
      id: 'category-list',
      name: 'Categoria',
      chips: CATEGORIES,
    },
    { id: 'tag-list', name: 'Etiquetes' },
    {
      id: 'state-list',
      name: 'Estats',
      chips: STATES,
    },
    {
      id: 'algorithm-type-list',
      name: "Tipus d'algorisme",
      chips: ALGORITHMS,
    },
  ];
  public hasFiltersApplied = false;
  public hasTagsSelected = false;
  public tagsSelected: string[] = [];

  public resetFilters(): void {
    this.tagsSelected = [];
    this.hasFiltersApplied = false;
  }

  public applyFilters(tag: string): void {
    this.hasFiltersApplied = true;

    if (tag) {
      this.hasTagsSelected = true;
      if (
        this.tagsSelected.length > 0 &&
        this.tagsSelected.some((tagSelected) => tagSelected === tag)
      )
        return;
      this.tagsSelected.push(tag);
    }
  }
}
