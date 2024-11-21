import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  AfterViewInit,
  HostListener,
  AfterViewChecked,
} from '@angular/core';
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card.component';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../services/card.service';
import { SystemsSearcherLinkComponent } from '../../../../shared/systems-searcher-link/systems-searcher-link.component';
import { TranslationService } from '../../../../services/translation.service';
import { CommonModule } from '@angular/common';
import { getLiterals } from '../../../../shared/utilities';

@Component({
  selector: 'app-algorithmic-systems-cards',
  standalone: true,
  imports: [
    AlgorithmicSystemCardComponent,
    SystemsSearcherLinkComponent,
    CommonModule,
  ],
  templateUrl: './algorithmic-systems-cards.component.html',
  styleUrl: './algorithmic-systems-cards.component.scss',
})
export class AlgorithmicSystemsCardsComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setDetails = new EventEmitter<AlgorithmicSystemCard>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  private readonly _componentSubscriptions: Subscription[] = [];
  private readonly _literals: Record<string, string> = {};
  private _translatedTexts: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(
    private readonly _algorithmicSystemService: CardService,
    private readonly _el: ElementRef,
    private readonly _translationService: TranslationService
  ) {}

  ngAfterViewInit(): void {
    this.setMaxHeightForElements();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setMaxHeightForElements();
  }

  public getAlgorithmicSystemDetails(
    algorithmicSystem: AlgorithmicSystemCard
  ): AlgorithmicSystemCard {
    return algorithmicSystem;
  }

  public setMaxHeightForElements(): void {
    this._setMaxHeight('h2');
    this._setMaxHeight('p');
    this._setMaxHeight(
      '.algorithmic-system-card-container__category-chip-container'
    );
  }

  private _setMaxHeight(selector: string): void {
    let highestHeight = 0;

    const elements = this._el.nativeElement.querySelectorAll(selector);
    elements.forEach((element: HTMLElement) => {
      element.style.height = '';
    });
    elements.forEach((element: HTMLElement) => {
      const height = element.offsetHeight;
      if (height > highestHeight) highestHeight = height;
    });
    elements.forEach((element: HTMLElement) => {
      element.style.height = `${highestHeight / 16}rem`;
    });
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.saveLiterals(this._literals);
  }

  ngOnInit(): void {
    this._translatedTexts = this._translationService.getTranslations();
    this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.algorithmicSystems = response.slice(0, 4);
      });
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
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

  public setView(event: string | AlgorithmicSystemCard): void {
    if (typeof event === 'string') {
      this._changeView.emit(event);
    } else {
      this._changeView.emit('system-detail');
      this._setDetails.emit(event);
    }
  }
}
