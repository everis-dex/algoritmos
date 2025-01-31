import { Component, EventEmitter, Output } from '@angular/core';
import { AccordionComponent } from '../../../../shared/components/accordion/accordion.component';
import {
  ALGORITHMS,
  CATEGORIES,
  STATES,
  TAGS_FILTER_INDEX,
} from '../../../../shared/constants/filters.const';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent {
  @Output()
  private readonly _filtersApplied = new EventEmitter<
    { name: string; chipsSelected: string[] }[]
  >();

  public filterList: {
    id: number;
    name: string;
    chips: string[];
    chipsSelected: string[];
  }[] = [
    {
      id: 0,
      name: 'Categoria',
      chips: CATEGORIES,
      chipsSelected: [],
    },
    {
      id: 1,
      name: 'Etiquetes',
      chips: [],
      chipsSelected: [],
    },
    {
      id: 2,
      name: 'Estats',
      chips: STATES,
      chipsSelected: [],
    },
    {
      id: 3,
      name: "Tipus d'algorisme",
      chips: ALGORITHMS,
      chipsSelected: [],
    },
  ];
  public filtersApplied = false;

  public resetFilters(): void {
    this.filterList = this.filterList.map((filterItem) => {
      return {
        ...filterItem,
        chipsSelected: [],
      };
    });
    this.filtersApplied = false;
    this._filtersApplied.emit(this.filterList);
  }

  public applyFilter({
    index,
    event,
    tag,
  }: {
    index: number;
    event?: string | MouseEvent;
    tag?: string;
  }): void {
    if (tag) {
      const chipAlreadySelected = this.filterList.some((filterItem) => {
        return filterItem.chipsSelected.includes(tag);
      });
      if (chipAlreadySelected) return;
      this.filterList[index].chipsSelected.push(tag);
    } else if (typeof event === 'string') {
      this.filterList[index].chipsSelected.push(event);
    }
    if (
      index > TAGS_FILTER_INDEX &&
      this.filterList[index].chipsSelected.length > 1
    )
      this.filterList[index].chipsSelected.shift();
    this.filtersApplied = true;
    this._filtersApplied.emit(this.filterList);
  }

  public removeFilter({
    index,
    event,
  }: {
    index: number;
    event: string;
  }): void {
    this.filterList[index].chipsSelected = this.filterList[
      index
    ].chipsSelected.filter((option) => option !== event);
    this.filtersApplied = this.filterList.some(
      (filter) => filter.chipsSelected.length > 0
    );
    this._filtersApplied.emit(this.filterList);
  }
}
