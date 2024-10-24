import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { CategoryChipComponent } from '../category-chip/category-chip.component';
import { SystemsSearcherLinkComponent } from '../systems-searcher-link/systems-searcher-link.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CategoryChipComponent, SystemsSearcherLinkComponent, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  public categorySelected = '';
  public isFilterVisible = false;
  public currentSearches: string[];
  public hasValue = false;

  @Input()
  public hasFilterSelector!: boolean;

  @Output()
  private readonly _changeView = new EventEmitter<string>();

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: MouseEvent): void {
    if (this.hasFilterSelector) {
      const categoryButton = document.querySelector(
        '.searcher-container__form__category-button'
      ) as HTMLElement;
      const searcherContainer = document.querySelector(
        '.searcher-container__filter'
      ) as HTMLElement;

      if (
        !categoryButton?.contains(event.target as Node) &&
        !searcherContainer?.contains(event.target as Node)
      ) {
        this.isFilterVisible = false;
      }
    }
  }

  constructor(private readonly _sessionStorageService: SessionStorageService) {
    this.currentSearches =
      this._sessionStorageService.getItem('currentSearches') || [];
  }

  public handleCategorySelect(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  public selectCategory(categorySelected: string): void {
    this.categorySelected = categorySelected;
    this.isFilterVisible = false;
  }

  public handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this._sessionStorageService.setItem('lastSearch', value);
    this.hasValue = value?.trim().length > 0;
    this.isFilterVisible = this.hasValue;
  }

  public handleSearch(event: KeyboardEvent | MouseEvent): void {
    if (
      (event instanceof KeyboardEvent && event.key === 'Enter') ||
      event instanceof MouseEvent
    ) {
      event.preventDefault();

      const item = this._sessionStorageService.getItem<string>('lastSearch');
      if (
        item &&
        !this.currentSearches.some((currentSearch) => currentSearch === item)
      ) {
        if (this.currentSearches.length === 5) this.currentSearches.shift();
        this.currentSearches.push(item);
        this._sessionStorageService.setItem(
          'currentSearches',
          this.currentSearches
        );
      }

      if (this.hasFilterSelector) this.redirectToSystemsSearcherView();
    }
  }

  public resetSearch(): void {
    this._sessionStorageService.clear();
    this.currentSearches = [];
  }

  public deleteSearch(index: number): void {
    this.currentSearches = this.currentSearches.filter(
      (currentSearch: string) => currentSearch !== this.currentSearches[index]
    );
    this._sessionStorageService.setItem(
      'currentSearches',
      this.currentSearches
    );
  }

  public redirectToSystemsSearcherView(currentSearch?: string): void {
    if (currentSearch)
      this._sessionStorageService.setItem('lastSearch', currentSearch);
    this._changeView.emit('systems-searcher');
  }
}
