import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { Subscription } from 'rxjs';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchPaginationComponent } from './components/search-pagination/search-pagination/search-pagination.component';
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../constants/search-pagination.const';
import { IAlgorithm, IFilterSearch } from '../../interfaces/algorithms';
import { AlgorithmsRegistryService } from '../../services/algorithms-registry.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-systems-searcher',
  standalone: true,
  imports: [
    SearchBarComponent,
    SearchFiltersComponent,
    SearchResultsComponent,
    SearchPaginationComponent,
  ],
  templateUrl: './systems-searcher.component.html',
  styleUrl: './systems-searcher.component.scss',
})
export class SystemsSearcherComponent implements OnInit, OnDestroy {
  public searchResults: IAlgorithm[] = [];
  public filterList: { filter: string; optionsSelected: string[] }[] = [];
  public totalSearchResultsLength = 0;
  public totalPages = 0;

  private _componentSubscriptions: Subscription[] = [];
  private _filtersAppliedParams: IFilterSearch = {};
  private _originalResults: IAlgorithm[] = [];

  constructor(
    private readonly _algorithmsRegistryService: AlgorithmsRegistryService,
    private readonly _sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._setSearchResults();
    this._setTotalPages();
  }

  private _setSearchResults(): void {
    const homeInputSearch =
      this._sessionStorageService.getItem<string>('lastSearch') ?? '';
    const homeCategorySearch =
      this._sessionStorageService.getItem<string>('popularCategorySelected') ??
      '';
    this._originalResults = this._algorithmsRegistryService.onCombinedSearch(
      homeInputSearch,
      { tema: homeCategorySearch }
    );
    this.searchResults = this._originalResults;
    this._sessionStorageService.removeItem('lastSearch');
    this._sessionStorageService.removeItem('popularCategorySelected');
  }

  private _setTotalPages(): void {
    this.totalSearchResultsLength = this.searchResults.length;
    if (this.totalSearchResultsLength > 6) {
      this.totalPages = Math.ceil(
        this.searchResults.length / MAX_SEARCH_RESULTS_PER_PAGE
      );
    } else {
      this.totalPages = 0;
    }
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  public changePage(page: number): void {
    this._getSearchResults(page);
    window.scrollTo(0, 0);
  }

  private _getSearchResults(page: number): void {
    this.searchResults = this._originalResults.slice(
      (page - 1) * MAX_SEARCH_RESULTS_PER_PAGE,
      page * MAX_SEARCH_RESULTS_PER_PAGE
    );
  }

  public getSearch(
    updatedFilterList: { filter: string; optionsSelected: string[] }[] | void
  ) {
    const inputSearch =
      this._sessionStorageService.getItem<string>('lastSearch') ?? '';
    if (updatedFilterList) {
      this.filterList = updatedFilterList;
      this._filtersAppliedParams = {
        tema: this.filterList[0].optionsSelected[0],
        etiquetes: this.filterList[1].optionsSelected.join(','),
        estat: this.filterList[2].optionsSelected[0],
        tipus_sistema: this.filterList[3].optionsSelected[0],
      };
    }
    this._originalResults = this._algorithmsRegistryService.onCombinedSearch(
      inputSearch,
      this._filtersAppliedParams
    );
    this.searchResults = this._originalResults;
    this._setTotalPages();
  }
}
