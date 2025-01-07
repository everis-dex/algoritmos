import { Component, Input } from '@angular/core';
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card.component';
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../../../constants/search-pagination.const';
import { IAlgorithm } from '../../../../interfaces/algorithms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [AlgorithmicSystemCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  @Input()
  public searchResults: IAlgorithm[] = [];
  @Input()
  public totalSearchResultsLength!: number;

  public maxSearchResultsPerPage = MAX_SEARCH_RESULTS_PER_PAGE;
}
