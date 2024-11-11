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
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card/algorithmic-system-card.component';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../services/card.service';
import { SystemsSearcherLinkComponent } from '../../../../shared/systems-searcher-link/systems-searcher-link.component';

@Component({
  selector: 'app-current-algorithmic-systems',
  standalone: true,
  imports: [AlgorithmicSystemCardComponent, SystemsSearcherLinkComponent],
  templateUrl: './current-algorithmic-systems.component.html',
  styleUrl: './current-algorithmic-systems.component.scss',
})
export class CurrentAlgorithmicSystemsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setDetails = new EventEmitter<AlgorithmicSystemCard>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  private _algorithmicSystemsSuscription!: Subscription;

  constructor(
    private readonly _algorithmicSystemService: CardService,
    private readonly _el: ElementRef
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
    this._algorithmicSystemsSuscription = this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.algorithmicSystems = response.slice(0, 4);
      });
  }

  ngOnDestroy(): void {
    if (this._algorithmicSystemsSuscription)
      this._algorithmicSystemsSuscription.unsubscribe();
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
