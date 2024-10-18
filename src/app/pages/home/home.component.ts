import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SearcherComponent } from './components/searcher/searcher.component';
import { AlgorithmicSystemCardComponent } from '../../shared/algorithmic-system-card/algorithmic-system-card/algorithmic-system-card.component';
import { AlgorithmicSystemService } from '../../services/algorithmic-system.service';
import { Subscription } from 'rxjs';
import { AlgorithmicSystemCard } from '../../interfaces/algorithmicSystems';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearcherComponent, AlgorithmicSystemCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  private _algorithmicSystemsSuscription!: Subscription;

  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setHeader = new EventEmitter<string>();

  constructor(
    private readonly _algorithmicSystemService: AlgorithmicSystemService
  ) {}

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

  public changeView(view: string): void {
    this._changeView.emit(view);
  }

  public getStateColor(): string {
    const stateColorConfig: Record<string, string> = {
      'En producció': 'Green',
      'En desenvolupament': 'Yellow',
      'Desmantellat': 'Red',
    };
    return stateColorConfig[this.algorithmicSystems[0].state];
  }

  public redirectToAlgorithmicSystemDetail(algorithmicSystemId?: number): void {
    this.changeView('system-detail');

    if (algorithmicSystemId) {
      const algorithmicSystemName = this.algorithmicSystems.find(
        (algorithmicSystem) => algorithmicSystem.id === algorithmicSystemId
      )?.title;
      this._setHeader.emit(algorithmicSystemName);
    }
  }
}
