import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-systems-searcher-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './systems-searcher-link.component.html',
  styleUrl: './systems-searcher-link.component.scss',
})
export class SystemsSearcherLinkComponent implements OnInit {
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  private _translatedLiterals: Record<string, string> = {};

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  public redirectToSystemsSearcherView(): void {
    this._changeView.emit('systems-searcher');
  }

  public getTranslatedText(key: string): string {
    this._translationService.storeLiterals(key);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
