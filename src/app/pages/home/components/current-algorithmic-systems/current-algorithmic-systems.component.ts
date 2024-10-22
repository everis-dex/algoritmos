import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
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
export class CurrentAlgorithmicSystemsComponent implements OnInit, OnDestroy {
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setHeader = new EventEmitter<string>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  private _algorithmicSystemsSuscription!: Subscription;

  constructor(private readonly _algorithmicSystemService: CardService) {}

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
