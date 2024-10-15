import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/categories';
import { SystemsSearcherLinkComponent } from '../../../../shared/systems-searcher-link/systems-searcher-link.component';
import { CategoryChipComponent } from '../../../../shared/category-chip/category-chip.component';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [SystemsSearcherLinkComponent, CategoryChipComponent, CommonModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent implements OnInit {
  public categories: Category[] = [];
  public categorySelected = '';
  public isFilterVisible = false;
  public isCurrentSearches = false;
  public currentSearches: string[] = [];
  public hasValue = false;

  @Output()
  private readonly _changeView = new EventEmitter<string>();

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this._categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  public handleCategorySelect(event: MouseEvent): void {
    event.preventDefault();
    this.isFilterVisible = !this.isFilterVisible;
  }

  public selectCategory(category: string): void {
    this.categorySelected = category;
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

      const item = this._sessionStorageService.getItem('lastSearch');
      if (
        item &&
        !this.currentSearches.some((currentSearch) => currentSearch === item)
      ) {
        if (this.currentSearches.length === 3) this.currentSearches.shift();
        this.currentSearches.push(item);
        this._sessionStorageService.setItem(
          'currentSearches',
          JSON.stringify(this.currentSearches)
        );
        this.isCurrentSearches = true;
      }

      this.redirectToSystemsSearcherView();
    }
  }

  public resetSearch(): void {
    this._sessionStorageService.clear();
    this.currentSearches = [];
    this.isCurrentSearches = false;
  }

  public deleteSearch(index: number): void {
    const currentSearchesSaved =
      this._sessionStorageService.getItem('currentSearches') ?? null;
    if (typeof currentSearchesSaved === 'string') {
      const currentSearches = JSON.parse(currentSearchesSaved);
      const updatedCurrentSearches = currentSearches?.filter(
        (currentSearch: string) => currentSearch !== this.currentSearches[index]
      );
      this._sessionStorageService.setItem(
        'currentSearches',
        JSON.stringify(updatedCurrentSearches)
      );
      this.currentSearches = updatedCurrentSearches;
      if (this.currentSearches?.length === 0) this.isCurrentSearches = false;
    }
  }

  public redirectToSystemsSearcherView(currentSearch?: string): void {
    if (currentSearch)
      this._sessionStorageService.setItem('lastSearch', currentSearch);
    this._changeView.emit('systems-searcher');
  }
}
