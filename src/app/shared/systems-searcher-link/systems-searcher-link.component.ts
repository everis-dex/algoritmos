import {
  AfterViewChecked,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { getLiterals } from '../utilities';

@Component({
  selector: 'app-systems-searcher-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './systems-searcher-link.component.html',
  styleUrl: './systems-searcher-link.component.scss',
})
export class SystemsSearcherLinkComponent implements OnInit, AfterViewChecked {
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  private readonly _translationLiterals: Record<string, string> = {};
  private _translatedTexts: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngAfterViewChecked(): void {
    if (Object.values(this._translationLiterals).length > 0)
      this._translationService.saveLiterals(this._translationLiterals);
  }

  ngOnInit(): void {
    this._translatedTexts = this._translationService.getTranslations();
  }

  public redirectToSystemsSearcherView(): void {
    this._changeView.emit('systems-searcher');
  }

  public getTranslatedText(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const literal = this._translationService.getLiteral(key, params);
    this._getLiterals(key, literal, this._translationLiterals);
    if (this._translatedTexts) return this._translatedTexts[key];
    return '';
  }
}
