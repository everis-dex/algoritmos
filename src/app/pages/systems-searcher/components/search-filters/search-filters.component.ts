import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AccordionComponent } from '../../../../shared/accordion/accordion/accordion.component';
import {
  ALGORITHMS,
  CATEGORIES,
  STATES,
  TAGS_ID,
} from '../../../../constants/search-filters.const';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent {
  @Output()
  private readonly _filtersApplied = new EventEmitter<
    { filter: string; optionsSelected: string[] }[]
  >();

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
  public resetTagsSelected = false;

  public resetFilters(id?: number): void {
    if (id) {
      this.filterList[id].optionsSelected = [];
      return;
    }
    this.filterList = this.filters.map((filter) => ({
      filter: filter.name,
      optionsSelected: [],
    }));
    this.resetTagsSelected = true;
  }

  public applyFilters({
    event,
    tag,
  }: {
    event: string | MouseEvent;
    tag?: string;
  }): void {
    if (event instanceof MouseEvent && tag) {
      const filterIndex = this.filters.findIndex((filter) => !filter.chips);
      this._addNewOptionSelected(tag, filterIndex);
    } else if (typeof event === 'string') {
      const filterIndex = this.filters.findIndex((filter) =>
        filter.chips?.includes(event)
      );
      this._addNewOptionSelected(event, filterIndex);
    }

    this.resetTagsSelected = false;
    this._filtersApplied.emit(this.filterList);
  }

  private _addNewOptionSelected(option: string, index: number): void {
    if (index >= TAGS_ID) this.resetFilters(index);
    const filter = this.filterList[index];
    if (!filter?.optionsSelected.includes(option)) {
      filter?.optionsSelected.push(option);
    }
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
