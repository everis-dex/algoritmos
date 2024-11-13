import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { getStateColor } from '../../../../shared/utilities';
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card/algorithmic-system-card.component';
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../../../constants/search-pagination.const';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [AlgorithmicSystemCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  @Input()
  public searchResults: AlgorithmicSystemCard[] = [];
  @Input()
  public totalSearchResultsLength!: number;

  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setDetails = new EventEmitter<AlgorithmicSystemCard>();

  public getStateColor = getStateColor;
  public maxSearchResultsPerPage = MAX_SEARCH_RESULTS_PER_PAGE;

  public setView(details: AlgorithmicSystemCard): void {
    this._changeView.emit('system-detail');
    this._setDetails.emit(details);
  }
}
