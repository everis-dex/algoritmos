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
  public customStyles?: Record<string, string>;

  public selectedChips: string[] = [];

  @Output()
  private readonly _selectChip = new EventEmitter<string>();

  public selectChip(chip: string): void {
    this._selectChip.emit(chip);
  }
}
