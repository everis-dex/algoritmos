import { Component, Input } from '@angular/core';
import { IAlgorithm } from '../../interfaces/algorithms';
import { ViewManagerService } from '../../services/view-manager.service';
import { AlgorithmsRegistryService } from '../../services/algorithms-registry.service';

@Component({
  selector: 'app-algorithmic-system-card',
  standalone: true,
  imports: [],
  templateUrl: './algorithmic-system-card.component.html',
  styleUrl: './algorithmic-system-card.component.scss',
})
export class AlgorithmicSystemCardComponent {
  @Input()
  public algorithm!: IAlgorithm;

  constructor(
    private readonly _viewManagerService: ViewManagerService,
    private readonly _algorithmsRegistryService: AlgorithmsRegistryService
  ) {}

  public redirectToSystemDetailView(
    event: MouseEvent,
    algorithm: IAlgorithm
  ): void {
    event.preventDefault();
    this._viewManagerService.setView('system-detail');
    this._algorithmsRegistryService.setCurrentAlgorithm(algorithm);
  }
}
