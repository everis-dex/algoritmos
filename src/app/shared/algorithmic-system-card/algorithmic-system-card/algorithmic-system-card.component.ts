import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-algorithmic-system-card',
  standalone: true,
  imports: [],
  templateUrl: './algorithmic-system-card.component.html',
  styleUrl: './algorithmic-system-card.component.scss',
})
export class AlgorithmicSystemCardComponent {
  @Input()
  public id!: number;
  @Input()
  public stateColor!: string;
  @Input()
  public state!: string;
  @Input()
  public title!: string;
  @Input()
  public description!: string;
  @Input()
  public categoryChip!: string;

  @Output()
  private readonly _changeView = new EventEmitter<void>();
  @Output()
  private readonly _setHeader = new EventEmitter<number>();

  public redirectToAlgorithmicSystemDetail(algorithmicSystemId: number): void {
    this._changeView.emit();
    this._setHeader.emit(algorithmicSystemId);
  }
}
