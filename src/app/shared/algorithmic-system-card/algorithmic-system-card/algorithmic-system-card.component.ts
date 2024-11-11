import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgorithmicSystemCard } from '../../../interfaces/cards';
import { getStateColor } from '../../utilities';

@Component({
  selector: 'app-algorithmic-system-card',
  standalone: true,
  imports: [],
  templateUrl: './algorithmic-system-card.component.html',
  styleUrl: './algorithmic-system-card.component.scss',
})
export class AlgorithmicSystemCardComponent {
  @Input()
  public algorithmicSystem!: AlgorithmicSystemCard;

  @Output()
  private readonly _changeView = new EventEmitter<AlgorithmicSystemCard>();
  @Output()
  private readonly _setHeader = new EventEmitter<number>();

  public getStateColor = getStateColor;

  public redirectToAlgorithmicSystemDetails(
    event: MouseEvent,
    algorithmicSystem: AlgorithmicSystemCard
  ): void {
    event.preventDefault();

    this._changeView.emit(algorithmicSystem);
    this._setHeader.emit(algorithmicSystem.id);
  }
}
