import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { AlgorithmicSystemCardComponent } from '../../../../shared/components/algorithmic-system-card/algorithmic-system-card.component';
import { Subscription } from 'rxjs';
import { SystemsSearcherLinkComponent } from '../../../../shared/components/systems-searcher-link/systems-searcher-link.component';
import { AlgorithmsRegistryService } from '../../../../services/algorithms-registry.service';
import { IAlgorithm } from '../../../../shared/interfaces/algorithms.model';

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
      ?.subscribe((data) => {
        const sortedData = data
          .filter((item) => item.data_ultima_modificacio)
          .sort((a, b) => {
            const convertToISO = (dateStr: string) => {
              if (dateStr.includes('/')) {
                const parts = dateStr.split('/');
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
              }
              return dateStr;
            };
            return (
              new Date(convertToISO(b.data_ultima_modificacio)).getTime() -
              new Date(convertToISO(a.data_ultima_modificacio)).getTime()
            );
          })
          .slice(0, 4);
        this.algorithms = sortedData;
      });
  }

  ngOnDestroy(): void {
    if (this._componentSubscription) this._componentSubscription.unsubscribe();
  }
}
