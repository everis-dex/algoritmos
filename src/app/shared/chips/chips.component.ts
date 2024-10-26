import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
})
export class ChipsComponent {
  @Input()
  public chips!: string[];

  @Output()
  private readonly _selectChip = new EventEmitter<string>();

  public handleChipClick(chip: string): void {
    this._selectChip.emit(chip);
  }
}
