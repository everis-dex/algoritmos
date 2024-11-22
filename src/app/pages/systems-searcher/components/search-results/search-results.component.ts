import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { getLiterals, getStateColor } from '../../../../shared/utilities';
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
export class SearchResultsComponent implements OnInit, AfterViewChecked {
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

  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  public setView(details: AlgorithmicSystemCard): void {
    this._changeView.emit('system-detail');
    this._setDetails.emit(details);
  }

  public getNumberOfSearchResults(): string {
    return `systems-searcher.results.${
      this.totalSearchResultsLength === 1
        ? 'one-result'
        : 'more-than-one-result'
    }`;
  }

  public getTranslatedText(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const literal = this._translationService.getLiteral(key, params);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) {
      if (params) {
        return this._translatedLiterals[key]?.replace(
          '{{totalSearchResults}}',
          `<strong>${this.totalSearchResultsLength}</strong>`
        );
      }
      return this._translatedLiterals[key];
    }
    return '';
  }
}
