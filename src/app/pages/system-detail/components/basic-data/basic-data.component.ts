import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { getStateColor } from '../../../../shared/utilities';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss',
})
export class BasicDataComponent implements OnInit {
  @Input()
  public algorithmicSystem!: AlgorithmicSystemCard;

  public getStateColor = getStateColor;

  private _translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  public getTranslatedText(key: string): string {
    this._translationService.storeLiterals(key);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
