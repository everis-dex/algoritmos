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
      id: 1,
      name: 'Categoria',
      chips: CATEGORIES,
    },
    { id: 2, name: 'Etiquetes' },
    {
      id: 3,
      name: 'Estats',
      chips: STATES,
    },
    {
      id: 4,
      name: "Tipus d'algorisme",
      chips: ALGORITHMS,
    },
  ];
  public filterList: { filter: string; optionsSelected: string[] }[] =
    this.filters.map((filter) => ({
      filter: filter.name,
      optionsSelected: [],
    }));
  public resetTags = false;

  public resetFilters(): void {
    this.filterList = this.filters.map((filter) => ({
      filter: filter.name,
      optionsSelected: [],
    }));
    this.resetTags = true;
  }

  public applyFilters({
    event,
    tag,
  }: {
    event: string | MouseEvent;
    tag?: string;
  }): void {
    let filterName: string | undefined;
    let selectedValue = '';

    if (event instanceof MouseEvent && tag) {
      filterName = this.filters.find((accordion) => !accordion.chips)?.name;
      selectedValue = tag;
    } else if (typeof event === 'string') {
      filterName = this.filters.find((accordion) =>
        accordion.chips?.includes(event)
      )?.name;
      selectedValue = event;
    }
    if (!filterName) return;

    const filterIndex = this.filters.findIndex(
      (accordion) => accordion.name === filterName
    );

    if (filterIndex !== -1) {
      const filter = this.filterList[filterIndex];
      if (!filter?.optionsSelected.includes(selectedValue)) {
        filter?.optionsSelected.push(selectedValue);
      }
    } else {
      this.filterList.push({
        filter: filterName,
        optionsSelected: [selectedValue],
      });
    }
    this.resetTags = false;
  }

  public removeFilters(event: string): void {
    const filterIndex = this.filterList.findIndex((filterItem) =>
      filterItem?.optionsSelected.includes(event)
    );
    if (filterIndex !== -1) {
      this.filterList[filterIndex].optionsSelected = this.filterList[
        filterIndex
      ].optionsSelected.filter((option) => option !== event);
    }
  }
}
