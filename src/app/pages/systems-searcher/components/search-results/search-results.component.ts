import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AlgorithmicSystemCardComponent } from '../../../../shared/components/algorithmic-system-card/algorithmic-system-card.component';
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../../../shared/constants/pagination.const';
import { IAlgorithm } from '../../../../shared/interfaces/algorithms.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [AlgorithmicSystemCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent {
  @Input()
  public searchResults: IAlgorithm[] = [];
  @Input()
  public totalSearchResultsLength!: number;

  public maxSearchResultsPerPage = MAX_SEARCH_RESULTS_PER_PAGE;

  public getResultsFound(): string {
    return (
      (this.totalSearchResultsLength === 1 ? "S'ha trobat" : "S'han trobat") +
      `<span class="search-results__bold">${this.totalSearchResultsLength}</span> ` +
      (this.totalSearchResultsLength === 1 ? 'resultat' : 'resultats')
    );
  }
}
