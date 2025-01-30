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
  public totalSearchResultsLength = 0;
  public totalPages = 0;

  private _componentSubscriptions: Subscription[] = [];
  private _filtersAppliedParams: IFilterSearch = {};
  private _updatedSearchResults: IAlgorithm[] = [];

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
    this.searchResults = this._algorithmsRegistryService.onCombinedSearch(
      homeInputSearch,
      { tema: homeCategorySearch }
    );
    this._updatedSearchResults = [...this.searchResults];
    this._sessionStorageService.removeItem('lastSearch');
    this._sessionStorageService.removeItem('popularCategorySelected');
  }

  private _setTotalPages(): void {
    this.totalSearchResultsLength = this.searchResults.length;
    this.totalPages = Math.ceil(
      this.totalSearchResultsLength / MAX_SEARCH_RESULTS_PER_PAGE
    );
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  public changePage(page: number): void {
    this.searchResults = this._updatedSearchResults.slice(
      (page - 1) * MAX_SEARCH_RESULTS_PER_PAGE,
      page * MAX_SEARCH_RESULTS_PER_PAGE
    );
    window.scrollTo(0, 0);
  }

  public getSearch(
    updatedFilterList?: { name: string; chipsSelected: string[] }[] | void
  ) {
    const inputSearch =
      this._sessionStorageService.getItem<string>('lastSearch') ?? '';
    if (updatedFilterList) {
      this._filtersAppliedParams = {
        tema: updatedFilterList[0].chipsSelected.join(','),
        etiquetes: updatedFilterList[1].chipsSelected.join(','),
        estat: updatedFilterList[2].chipsSelected[0],
        tipus_sistema: updatedFilterList[3].chipsSelected[0],
      };
    }
    this.searchResults = this._algorithmsRegistryService.onCombinedSearch(
      inputSearch,
      this._filtersAppliedParams
    );
    this._updatedSearchResults = [...this.searchResults];
    this._setTotalPages();
  }
}
