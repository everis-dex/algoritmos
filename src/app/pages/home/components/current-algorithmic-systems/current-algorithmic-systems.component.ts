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
  private readonly _setHeader = new EventEmitter<string>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  private _algorithmicSystemsSuscription!: Subscription;

  constructor(
    private readonly _algorithmicSystemService: CardService,
    private _el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.setMaxHeightForElements('h2');
    this.setMaxHeightForElements('p');
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setMaxHeightForElements('h2');
    this.setMaxHeightForElements('p');
  }

  setMaxHeightForElements(selector: string): void {
    let highestHeight = 0;

    const elements = this._el.nativeElement.querySelectorAll(selector);
    elements.forEach((element: HTMLElement) => {
      (element as HTMLElement).style.height = '';
    });
    elements.forEach((element: HTMLElement) => {
      const height = (element as HTMLElement).offsetHeight;
      if (height > highestHeight) highestHeight = height;
    });
    elements.forEach((element: HTMLElement) => {
      (element as HTMLElement).style.height = `${highestHeight / 16}rem`;
    });
  }

  ngOnInit(): void {
    this._algorithmicSystemsSuscription = this._algorithmicSystemService
      .getAlgorithmicSystems()
      .subscribe((response) => {
        this.algorithmicSystems = response;
      });
  }

  ngOnDestroy(): void {
    if (this._algorithmicSystemsSuscription)
      this._algorithmicSystemsSuscription.unsubscribe();
  }

  public getStateColor(): string {
    const stateColorConfig: Record<string, string> = {
      'En producció': 'Green',
      'En desenvolupament': 'Yellow',
      Desmantellat: 'Red',
    };
    return stateColorConfig[this.algorithmicSystems[0].state];
  }

  public setHeader(algorithmicSystemId: number): void {
    const algorithmicSystemName = this.algorithmicSystems.find(
      (algorithmicSystem) => algorithmicSystem.id === algorithmicSystemId
    )?.title;
    this._setHeader.emit(algorithmicSystemName);
  }

  public changeView(view: string): void {
    this._changeView.emit(view);
  }
}
