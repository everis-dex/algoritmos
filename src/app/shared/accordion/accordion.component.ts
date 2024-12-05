import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChipsComponent } from '../chips/chips.component';
import { TAGS_FILTER_INDEX } from '../../constants/search-filters.const';
import { ITabData } from '../../pages/system-detail/components/tabs-data/tabs-data.model';
import { IFilterData } from './accordion.model';
import { TabFieldDataComponent } from '../tab-field-data/tab-field-data.component';
import { normalized } from '../utilities';
import { AlgorithmsRegistryService } from '../../services/algorithms-registry.service';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, ChipsComponent, TabFieldDataComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements OnInit {
  @Input()
  public accordionList!: IFilterData[] | ITabData[];

  @Output()
  private readonly _applyFilter = new EventEmitter<{
    index: number;
    event?: string | MouseEvent;
    tag?: string;
  }>();
  @Output()
  private readonly _removeFilter = new EventEmitter<{
    index: number;
    event: string;
  }>();
  @Output()
  private readonly _setTabFields = new EventEmitter<number>();

  public toggleStates: Record<string, { display: boolean; rotation: boolean }> =
    {};
  public isSelectorRotated = false;
  public tags: string[] = [];
  public hasInputValue = false;
  public filteredTags: string[] = [];
  public isDesktop = false;
  public className = '';

  private readonly _normalized = normalized;
  private _mediaQueryList!: MediaQueryList;

  constructor(
    private readonly _algorithmsRegistryService: AlgorithmsRegistryService
  ) {}

  ngOnInit(): void {
    this._checkBreakpoint();
    this.tags = this._algorithmsRegistryService.getAlgorithmTagList();
    this.filteredTags = [...this.tags];
    this.accordionList?.forEach((accordion) => {
      this.toggleStates[accordion.id] = {
        display: !!this.isFilter(accordion),
        rotation: !!this.isFilter(accordion),
      };
    });
  }

  private _checkBreakpoint(): void {
    this._mediaQueryList = window.matchMedia(`(min-width: 1200px)`);
    this.isDesktop = this._mediaQueryList.matches;
    this._mediaQueryList.addEventListener(
      'change',
      (event: MediaQueryListEvent) => {
        this.isDesktop = event.matches;
      }
    );
  }

  public getButtonContent(index: number): string {
    if (this.accordionList?.[index]) {
      if ('name' in this.accordionList[index]) {
        this.className = 'filter';
        return this.accordionList[index].name;
      }
      this.className = 'tab';
      return this.accordionList[index].tab;
    }
    return '';
  }

  public isFilter(item: IFilterData | ITabData): item is IFilterData {
    return 'chips' in item;
  }

  public isTab(item: ITabData): item is ITabData {
    return 'tab' in item;
  }

  public getChipsSelected(item: IFilterData): string[] {
    return item.chipsSelected;
  }

  public areTagsSelected(item: IFilterData): boolean {
    if (item.id === TAGS_FILTER_INDEX) return item.chipsSelected.length > 0;
    return false;
  }

  public filterTags(inputValue?: string): void {
    if (!inputValue) {
      this.hasInputValue = false;
      this.filteredTags = this.tags;
      return;
    }
    const normalizedInput = this._normalized(inputValue);
    this.filteredTags = this.tags
      .filter((tag) => {
        const normalizedTag = this._normalized(tag);
        return normalizedTag.includes(normalizedInput);
      })
      .sort((a, b) => {
        const normalizedA = this._normalized(a);
        const normalizedB = this._normalized(b);
        const startsWithA = normalizedA.startsWith(normalizedInput) ? -1 : 1;
        const startsWithB = normalizedB.startsWith(normalizedInput) ? -1 : 1;
        if (startsWithA !== startsWithB) {
          return startsWithA - startsWithB;
        }
        return normalizedA.localeCompare(normalizedB);
      });
  }

  public toggle(index: number): void {
    if (index === TAGS_FILTER_INDEX && this.hasInputValue) this.filterTags();
    this.toggleStates[index] = {
      display: !this.toggleStates[index]?.display,
      rotation: !this.toggleStates[index]?.rotation,
    };
    this._setTabFields.emit(index);
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

  public selectChip(
    index: number,
    event: string | MouseEvent,
    tag?: string
  ): void {
    if (event instanceof MouseEvent && tag) {
      event.preventDefault();
      this._applyFilter.emit({ index, tag });
    } else if (typeof event === 'string') {
      this._applyFilter.emit({ index, event });
    }
  }

  public deselectChip(item: IFilterData, event: string): void {
    this._removeFilter.emit({ index: item.id, event });
  }

  public setPadding(item: IFilterData): string {
    if (item.chipsSelected.length === 0) {
      return this.isDesktop ? '1.25rem 0' : '0.5rem 0';
    } else {
      return this.isDesktop ? '0 0 1.25rem' : '0 0 0.5rem';
    }
  }
}
