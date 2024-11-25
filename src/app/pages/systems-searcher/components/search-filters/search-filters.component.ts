import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccordionComponent } from '../../../../shared/accordion/accordion.component';
import {
  ALGORITHMS,
  CATEGORIES,
  STATES,
  TAGS_ID,
} from '../../../../constants/search-filters.const';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit {
  @Output()
  private readonly _filtersApplied = new EventEmitter<
    { filter: string; optionsSelected: string[] }[]
  >();

  public filters: { id: number; name: string; chips?: string[] }[] = [
    {
      id: 1,
      name: 'systems-searcher.filters.accordion-list.categories.name',
      chips: CATEGORIES.map(
        (_, index) =>
          `systems-searcher.filters.accordion-list.categories.chips.chip-${index}`
      ),
    },
    {
      id: 2,
      name: 'systems-searcher.filters.accordion-list.tags.name',
    },
    {
      id: 3,
      name: 'systems-searcher.filters.accordion-list.states.name',
      chips: STATES,
    },
    {
      id: 4,
      name: 'systems-searcher.filters.accordion-list.algorithms.name',
      chips: ALGORITHMS,
    },
  ];
  public filterList: { filter: string; optionsSelected: string[] }[] =
    this.filters.map((filter) => ({
      filter: filter.name,
      optionsSelected: [],
    }));
  public resetTagsSelected = false;
  public translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
  }

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
        filter.chips
          ?.map((chip) => {
            if (!chip.includes('.')) return chip;
            return this.translatedLiterals[chip];
          })
          .includes(event)
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
