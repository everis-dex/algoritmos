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
  public translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
  }
}
