import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { getLiterals } from '../utilities';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit, AfterViewChecked {
  @Input()
  public currentView!: string;
  @Input()
  public algorithmicSystemName!: string;

  @Output()
  private readonly _changeView = new EventEmitter<void>();

  private readonly _translationLiterals: Record<string, string> = {};
  private _translatedTexts: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedTexts = this._translationService.getTranslations();
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._translationLiterals).length > 0)
      this._translationService.saveLiterals(this._translationLiterals);
  }

  public redirectToHomeView(event: Event): void {
    event.preventDefault();
    this._changeView.emit();
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
