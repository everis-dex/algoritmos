import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'app-more-information-card',
  standalone: true,
  imports: [],
  templateUrl: './more-information-card.component.html',
  styleUrl: './more-information-card.component.scss',
})
export class MoreInformationCardComponent implements OnInit {
  public translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
  }
}
