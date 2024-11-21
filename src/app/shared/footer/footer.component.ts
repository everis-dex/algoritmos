import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { getLiterals } from '../utilities';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, AfterViewChecked {
  private readonly _literals: Record<string, string> = {};
  private _translatedTexts: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedTexts = this._translationService.getTranslations();
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.saveLiterals(this._literals);
  }

  public getTranslatedText(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const literal = this._translationService.getLiteral(key, params);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedTexts) return this._translatedTexts[key];
    return '';
  }
}
