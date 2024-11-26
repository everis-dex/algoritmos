import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { Subscription } from 'rxjs';
import { CardService } from '../../services/card.service';
import { AlgorithmicSystemCard } from '../../interfaces/cards';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchPaginationComponent } from './components/search-pagination/search-pagination/search-pagination.component';
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../constants/search-pagination.const';

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
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setDetails = new EventEmitter<AlgorithmicSystemCard>();

  public searchResults: AlgorithmicSystemCard[] = [];
  public filterList: { filter: string; optionsSelected: string[] }[] = [];
  public totalSearchResultsLength = 0;
  public totalPages = 0;

  private _componentSubscriptions: Subscription[] = [];

  constructor(private readonly _algorithmicSystemService: CardService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.searchResults = response;
        this.totalSearchResultsLength = this.searchResults.length;
        if (this.totalSearchResultsLength > 6) {
          this.totalPages = Math.ceil(
            this.searchResults.length / MAX_SEARCH_RESULTS_PER_PAGE
          );
        }
      });
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
    this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.searchResults = response.slice(
          (page - 1) * MAX_SEARCH_RESULTS_PER_PAGE,
          page * MAX_SEARCH_RESULTS_PER_PAGE
        );
      });
  }

  public filtersApplied(
    updatedFilterList: { filter: string; optionsSelected: string[] }[]
  ): void {
    this.filterList = updatedFilterList;
  }

  public changeView(view: string): void {
    this._changeView.emit(view);
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this._setDetails.emit(details);
  }
}
