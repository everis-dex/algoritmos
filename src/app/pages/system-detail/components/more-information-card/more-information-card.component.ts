import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../../services/translation.service';
import { getLiterals } from '../../../../shared/utilities';

@Component({
  selector: 'app-more-information-card',
  standalone: true,
  imports: [],
  templateUrl: './more-information-card.component.html',
  styleUrl: './more-information-card.component.scss',
})
export class MoreInformationCardComponent implements OnInit, AfterViewChecked {
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

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
