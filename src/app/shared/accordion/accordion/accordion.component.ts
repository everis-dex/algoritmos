import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Accordion } from '../../../interfaces/accordion';
import { ChipsComponent } from '../../chips/chips.component';
import { TAGS, TAGS_ID } from '../../../constants/search-filters.const';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, ChipsComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements OnInit {
  @Input()
  public accordionList!: Accordion[];
  @Input()
  public filterList!: { filter: string; optionsSelected: string[] }[];
  @Input()
  public resetTagsSelected!: boolean;

  @Output()
  private readonly _applyFilters = new EventEmitter<{
    event: string | MouseEvent;
    tag?: string;
  }>();
  @Output()
  private readonly _removeFilters = new EventEmitter<string>();

  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {};
  public isSelectorRotated = false;
  public tags = TAGS;
  public hasTagsSelected = false;
  public hasInputValue = false;
  public filteredTags: string[] = [...this.tags];

  ngOnInit(): void {
    this.accordionList?.forEach((accordion) => {
      this.toggleStates[accordion.id] = { display: false, rotation: false };
    });
  }

  public getOptionsSelected(index: number): string[] {
    return this.filterList?.[index - 1]?.optionsSelected;
  }

  public filterTags(inputValue?: string): void {
    if (!inputValue) {
      this.hasInputValue = false;
      this.filteredTags = this.tags;
      return;
    }
    const lowerInputValue = inputValue.toLowerCase();
    this.filteredTags = this.tags
      .filter((tag) =>
        tag
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(lowerInputValue)
      )
      .sort((a, b) => {
        const startsWithA = a.toLowerCase().startsWith(lowerInputValue)
          ? -1
          : 1;
        const startsWithB = b.toLowerCase().startsWith(lowerInputValue)
          ? -1
          : 1;
        return startsWithA - startsWithB;
      });
  }

  public toggle(id: number): void {
    if (id === TAGS_ID && this.hasInputValue) this.filterTags();
    this.toggleStates[id] = {
      display: !this.toggleStates[id]?.display,
      rotation: !this.toggleStates[id]?.rotation,
    };
  }

  public handleTagSelect(): void {
    if (this.hasInputValue) this.filterTags();
    this.isSelectorRotated = !this.isSelectorRotated;
  }

  public handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.hasInputValue = value?.trim().length > 0;
    this.filterTags(value);
  }

  public selectChip(event: string | MouseEvent, tag?: string): void {
    if (event instanceof MouseEvent && tag) {
      event.preventDefault();
      if (!this.tags.includes(tag)) return;
      this.hasTagsSelected = true;
      this._applyFilters.emit({ event, tag });
    } else {
      this._applyFilters.emit({ event });
    }
  }

  public deselectChip(event: string, index?: number): void {
    this._removeFilters.emit(event);
    if (index) {
      if (this.filterList[index - 1].optionsSelected.length === 0)
        this.hasTagsSelected = false;
    }
  }
}
