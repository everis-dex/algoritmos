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
  @Input()
  public translatedAlgorithmicSystemName!: string;

  @Output()
  private readonly _changeView = new EventEmitter<void>();

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

  public redirectToHomeView(event: Event): void {
    event.preventDefault();
    this._changeView.emit();
  }

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
