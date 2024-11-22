import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ChipsComponent } from '../chips/chips.component';
import { TAGS, TAGS_ID } from '../../constants/search-filters.const';
import { ITabData } from '../../pages/system-detail/components/tabs-data/tabs-data.model';
import { IAccordionData } from './accordion.model';
import { TabFieldDataComponent } from '../tab-field-data/tab-field-data.component';
import { getLiterals } from '../utilities';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, ChipsComponent, TabFieldDataComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements OnInit, AfterViewChecked {
  @Input()
  public accordionList!: IAccordionData[] | ITabData[];
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
  @Output()
  private readonly _setTabFields = new EventEmitter<number>();

  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {};
  public isSelectorRotated = false;
  public tags = TAGS;
  public hasTagsSelected = false;
  public hasInputValue = false;
  public filteredTags: string[] = [...this.tags];

  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
    this.accordionList?.forEach((accordion) => {
      this.toggleStates[accordion.id] = { display: false, rotation: false };
    });
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  public isAccordionData(
    item: IAccordionData | ITabData
  ): item is IAccordionData {
    return (item as IAccordionData).name !== undefined;
  }

  public isTabData(item: IAccordionData | ITabData): item is ITabData {
    return (item as ITabData).tab !== undefined;
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
    this._setTabFields.emit(id - 1);
  }

  public handleTagSelect(): void {
    if (this.hasInputValue) this.filterTags();
    this.isSelectorRotated = !this.isSelectorRotated;
  }

  public handleInput(event: Event | KeyboardEvent): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter')
      event.preventDefault();
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

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
