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
  public hasFiltersApplied!: boolean;
  @Input()
  public hasTagsSelected!: boolean;
  @Input()
  public tagsSelected!: string[];

  @Output()
  private readonly _applyFilters = new EventEmitter<string>();

  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {};
  public isRotation = false;
  public tags = TAGS;
  public hasValue = false;

  ngOnInit(): void {
    this.accordionList?.forEach((accordion) => {
      this.toggleStates[accordion.id] = { display: false, rotation: false };
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

  public handleChip(event: string | MouseEvent, tag?: string): void {
    this._applyFilters.emit(tag);
    if (event instanceof MouseEvent) event.preventDefault();
  }

  public handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.hasValue = value?.trim().length > 0;
  }
}
