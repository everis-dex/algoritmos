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

  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
  }

  public redirectToSystemsSearcherView(): void {
    this._changeView.emit('systems-searcher');
  }

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
