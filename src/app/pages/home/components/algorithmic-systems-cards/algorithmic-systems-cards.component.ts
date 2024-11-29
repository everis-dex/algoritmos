import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { AlgorithmicSystemCardComponent } from '../../../../shared/algorithmic-system-card/algorithmic-system-card.component';
import { Subscription } from 'rxjs';
import { SystemsSearcherLinkComponent } from '../../../../shared/systems-searcher-link/systems-searcher-link.component';
import { AlgorithmsRegistryService } from '../../../../services/algorithms-registry.service';
import { IAlgorithm } from '../../../../interfaces/algorithms';
import { mockAlgorithms } from '../../../../mocks/algorithms';

@Component({
  selector: 'app-algorithmic-systems-cards',
  standalone: true,
  imports: [AlgorithmicSystemCardComponent, SystemsSearcherLinkComponent],
  templateUrl: './algorithmic-systems-cards.component.html',
  styleUrl: './algorithmic-systems-cards.component.scss',
})
export class AlgorithmicSystemsCardsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public algorithms: IAlgorithm[] = [];

  private _componentSubscription!: Subscription;

  constructor(
    private readonly _algorithmsRegistryService: AlgorithmsRegistryService,
    private readonly _el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.setMaxHeightForElements();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setMaxHeightForElements();
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
    this._componentSubscription = this._algorithmsRegistryService
      .getAlgorithmsSubject()
      .subscribe((data) => {
        //this.algorithms = data;
        this.algorithms = mockAlgorithms;
        this.algorithms.sort((a, b) => {
          const firstDate = a.data_ultima_modificacio;
          const secondDate = b.data_ultima_modificacio;
          return new Date(secondDate).getTime() - new Date(firstDate).getTime();
        });
        this.algorithms = this.algorithms.slice(0, 4);
      });
  }

  ngOnDestroy(): void {
    if (this._componentSubscription) this._componentSubscription.unsubscribe();
  }
}
