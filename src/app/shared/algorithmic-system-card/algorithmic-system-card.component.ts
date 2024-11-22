import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgorithmicSystemCard } from '../../interfaces/cards';
import { getStateColor } from '../utilities';

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

  public getStateColor = getStateColor;
  public translatedAlgorithmicSystemName = '';

  public redirectToAlgorithmicSystemDetails(
    event: MouseEvent,
    algorithmicSystem: AlgorithmicSystemCard
  ): void {
    event.preventDefault();

    this._changeView.emit(algorithmicSystem);
  }
}
