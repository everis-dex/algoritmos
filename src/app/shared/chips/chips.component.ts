import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
})
export class ChipsComponent {
  @Input()
  public chips!: string[];
  @Input()
  public chipsSelected!: string[] | undefined;

  @Output()
  private readonly _selectChip = new EventEmitter<string>();
  @Output()
  private readonly _deselectChip = new EventEmitter<string>();

  public selectChip(chip: string): void {
    this._selectChip.emit(chip);
  }

  public deselectChip(chip: string): void {
    this._deselectChip.emit(chip);
  }
}
