import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { getStateColor } from '../../../../shared/utilities';
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card.component';
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../../../constants/search-pagination.const';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [AlgorithmicSystemCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
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
  public translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  public setView(details: AlgorithmicSystemCard): void {
    this._changeView.emit('system-detail');
    this._setDetails.emit(details);
  }

  public getTotalSearchResults(totalSearchResultsLength: number): string {
    const translatedTotalSearchResults =
      this.translatedLiterals[
        `systems-searcher.results.${
          totalSearchResultsLength === 1 ? 'one-result' : 'more-than-one-result'
        }`
      ];
    if (translatedTotalSearchResults)
      return translatedTotalSearchResults.replace(
        '{{totalSearchResults}}',
        `<strong>${totalSearchResultsLength}</strong>`
      );
    return '';
  }
}
