import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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

  public toggleState: Record<string, { display: boolean }> = {};
  public isSelectorRotated = false;
  public tags: string[] = [];
  public hasInputValue = false;
  public filteredTags: string[] = [];
  public isDesktop = false;

  private readonly _normalized = normalized;
  private _mediaQueryList!: MediaQueryList;

  constructor(
    private readonly _algorithmsRegistryService: AlgorithmsRegistryService
  ) {}

  ngOnInit(): void {
    this.checkBreakpoint();
    this.tags = this._algorithmsRegistryService.getAlgorithmTagList();
    this.filteredTags = [...this.tags];
    this.accordionList?.forEach((accordion) => {
      this.toggleState[accordion.id] = {
        display: true,
      };
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkBreakpoint();
  }

  public checkBreakpoint(): void {
    this._mediaQueryList = window.matchMedia(`(min-width: 1200px)`);
    this.isDesktop = this._mediaQueryList.matches;
  }

  public getButtonContent(index: number): string {
    const accordionListindex = this.accordionList[index];
    if ('name' in accordionListindex) {
      return accordionListindex.name;
    }
    return accordionListindex.tab;
  }

  public isFilter(item: IFilterData | ITabData): item is IFilterData {
    return 'chips' in item;
  }

  public isTab(item: IFilterData | ITabData): item is ITabData {
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
    const accordionState = this.toggleState[index];
    if (accordionState) accordionState.display = !accordionState.display;
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

  public setMarginTop(id: number): string {
    if (!this.isDesktop && id !== 0 && this.toggleState[id - 1].display)
      return '0.5rem';
    return '0';
  }
}
