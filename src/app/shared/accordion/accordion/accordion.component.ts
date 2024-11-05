import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Accordion } from '../../../interfaces/accordion';
import { ChipsComponent } from '../../chips/chips.component';
import { TAGS } from '../../../constants/search-filters.const';

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
  public tagsSelected!: string[];
  @Input()
  public chipsSelected!: string[];

  @Output()
  private readonly _applyFilters = new EventEmitter<{
    event: string | MouseEvent;
    tag?: string | undefined;
  }>();
  @Output()
  private readonly _removeFilters = new EventEmitter<{
    event: string;
    isChipSelected?: boolean;
    isTagSelected?: boolean;
  }>();

  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {};
  public isRotation = false;
  public tags = TAGS;
  public hasValue = false;
  public filteredTags: string[] = [...this.tags];

  ngOnInit(): void {
    this.accordionList?.forEach((accordion) => {
      this.toggleStates[accordion.id] = { display: false, rotation: false };
    });
  }

  public filterTags(inputValue: string): void {
    const lowerInputValue = inputValue.toLowerCase();
    this.filteredTags = this.tags
      .filter((tag) => tag.toLowerCase().includes(lowerInputValue))
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

  public toggle(id: string): void {
    this.toggleStates[id] = {
      display: !this.toggleStates[id].display,
      rotation: !this.toggleStates[id].rotation,
    };
  }

  public handleTagSelect(): void {
    this.isRotation = !this.isRotation;
  }

  public handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.hasValue = value?.trim().length > 0;
    this.filterTags(value);
  }

  public selectChip(event: string | MouseEvent, tag?: string): void {
    if (event instanceof MouseEvent) event.preventDefault();
    this._applyFilters.emit({ event, tag });
  }

  public deselectChip(event: string): void {
    if (this.chipsSelected.includes(event)) {
      this._removeFilters.emit({
        event,
        isChipSelected: true,
      });
    } else if (this.tagsSelected.includes(event)) {
      this._removeFilters.emit({
        event,
        isTagSelected: true,
      });
    }
  }
}
