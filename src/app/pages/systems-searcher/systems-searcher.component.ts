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
  private readonly _setHeader = new EventEmitter<string>();
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  public searchResults: AlgorithmicSystemCard[] = [];
  public filterList: { filter: string; optionsSelected: string[] }[] = [];
  public totalSearchResultsLength = 0;
  public totalPages = 0;

  private _algorithmicSystemsSuscription!: Subscription;

  constructor(private readonly _algorithmicSystemService: CardService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._algorithmicSystemsSuscription = this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.searchResults = response;
        this.totalSearchResultsLength = this.searchResults.length;
        this.totalPages = Math.ceil(this.searchResults.length / 6);
      });
  }

  ngOnDestroy(): void {
    if (this._algorithmicSystemsSuscription)
      this._algorithmicSystemsSuscription.unsubscribe();
  }

  public changePage(page: number): void {
    this._getSearchResults(page);
    window.scrollTo(0, 0);
  }

  private _getSearchResults(page: number): void {
    this._algorithmicSystemsSuscription = this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.searchResults = response.slice((page - 1) * 6, page * 6);
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

  public setHeader(name: string): void {
    this._setHeader.emit(name);
  }
}
