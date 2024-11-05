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
  public chipsSelected: string[] = [];
  public tagsSelected: string[] = [];

  public resetFilters(): void {
    this.chipsSelected = [];
    this.tagsSelected = [];
  }

  public applyFilters({
    event,
    tag,
  }: {
    event: string | MouseEvent;
    tag?: string | undefined;
  }): void {
    if (event instanceof MouseEvent && tag) {
      if (
        this.tagsSelected.length > 0 &&
        this.tagsSelected.some((tagSelected) => tagSelected === tag)
      )
        return;
      this.tagsSelected.push(tag);
    } else if (typeof event === 'string') {
      this.chipsSelected.push(event);
    }
  }

  public removeFilters({
    event,
    isChipSelected,
    isTagSelected,
  }: {
    event: string;
    isChipSelected?: boolean;
    isTagSelected?: boolean;
  }): void {
    if (isChipSelected) {
      const index = this.chipsSelected.indexOf(event);
      if (index > -1) this.chipsSelected.splice(index, 1);
    } else if (isTagSelected) {
      const index = this.tagsSelected.indexOf(event);
      if (index > -1) this.tagsSelected.splice(index, 1);
    }
  }
}
