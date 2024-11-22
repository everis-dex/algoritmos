import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card.component';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../services/card.service';
import { SystemsSearcherLinkComponent } from '../../../../shared/systems-searcher-link/systems-searcher-link.component';
import { TranslationService } from '../../../../services/translation.service';
import { CommonModule } from '@angular/common';

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
  implements OnInit, OnDestroy, AfterViewInit
{
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setDetails = new EventEmitter<AlgorithmicSystemCard>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  private readonly _componentSubscriptions: Subscription[] = [];
  private _translatedLiterals: Record<string, string> = {};

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

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
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

  public getTranslatedText(key: string): string {
    this._translationService.storeLiterals(key);
    if (this._translatedLiterals) return this._translatedLiterals[key];
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
