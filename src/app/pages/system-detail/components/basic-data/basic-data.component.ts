import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { getLiterals, getStateColor } from '../../../../shared/utilities';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss',
})
export class BasicDataComponent implements OnInit, AfterViewChecked {
  @Input()
  public algorithmicSystem!: AlgorithmicSystemCard;

  public getStateColor = getStateColor;

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
