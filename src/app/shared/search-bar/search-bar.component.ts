import {
  AfterViewChecked,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChipsComponent } from '../chips/chips.component';
import { SystemsSearcherLinkComponent } from '../systems-searcher-link/systems-searcher-link.component';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { TranslationService } from '../../services/translation.service';
import { getLiterals } from '../utilities';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ChipsComponent, SystemsSearcherLinkComponent, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy, AfterViewChecked {
  public popularCategories: string[] = [];
  public categorySelected = '';
  public isFilterVisible = false;
  public currentSearches: string[];
  public hasInputValue = false;
  public isDesktop = false;

  @Input()
  public hasFilterSelector!: boolean;

  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _translateLiterals = new EventEmitter<void>();

  private readonly _componentSubscriptions: Subscription[] = [];
  private readonly _translationLiterals: Record<string, string> = {};
  private _translatedTexts: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _sessionStorageService: SessionStorageService,
    private readonly _translationService: TranslationService,
    private readonly _breakpointObserver: BreakpointObserver
  ) {
    this.currentSearches =
      this._sessionStorageService.getItem('currentSearches') || [];
  }

  ngOnInit(): void {
    this._translatedTexts = this._translationService.getTranslations();
    this._checkBreakpoint();
    const popularCategories =
      this._sessionStorageService.getItem<string[]>('popularCategories');
    if (popularCategories !== null) {
      this.popularCategories = popularCategories;
    } else {
      this._categoryService.getCategories().subscribe((categories) => {
        this.popularCategories = categories;
        this._sessionStorageService.setItem(
          'popularCategories',
          this.popularCategories
        );
      });
    }
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._translationLiterals).length > 0)
      this._translationService.saveLiterals(this._translationLiterals);
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

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

  private _checkBreakpoint(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isDesktop = !result.matches;
      });
  }

  public getTranslatedText(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const literal = this._translationService.getLiteral(key, params);
    this._getLiterals(key, literal, this._translationLiterals);
    if (this._translatedTexts) return this._translatedTexts[key];
    return '';
  }

  public handleCategorySelect(): void {
    this.isFilterVisible = !this.isFilterVisible;
    this._translateLiterals.emit();
  }

  public selectCategory(categorySelected: string): void {
    this.categorySelected = categorySelected;
    this.isFilterVisible = false;
  }

  public handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this._sessionStorageService.setItem('lastSearch', value);
    this.hasInputValue = value?.trim().length > 0;
    this.isFilterVisible = this.hasInputValue;
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

      if (this.hasFilterSelector) this.redirectToSystemsSearcherView({});
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

  public redirectToSystemsSearcherView({
    event,
    currentSearch,
  }: {
    event?: string;
    currentSearch?: string;
  }): void {
    if (currentSearch)
      this._sessionStorageService.setItem('lastSearch', currentSearch);
    this._changeView.emit(event ?? 'systems-searcher');
  }
}
