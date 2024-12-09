import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
})
export class ChipsComponent implements OnInit {
  @Input()
  public chips!: string[];
  @Input()
  public chipsSelected!: string[] | undefined;
  @Input()
  public isFilter!: boolean;

  @Output()
  private readonly _selectChip = new EventEmitter<string>();
  @Output()
  private readonly _deselectChip = new EventEmitter<string>();

  public isDesktop = false;

  private _mediaQueryList!: MediaQueryList;

  ngOnInit(): void {
    this._checkBreakpoint();
  }

  private _checkBreakpoint(): void {
    this._mediaQueryList = window.matchMedia(`(min-width: 1200px)`);
    this.isDesktop = this._mediaQueryList.matches;
    this._mediaQueryList.addEventListener(
      'change',
      (event: MediaQueryListEvent) => {
        this.isDesktop = event.matches;
      }
    );
  }

  public selectChip(chip: string): void {
    this._selectChip.emit(chip);
  }

  public deselectChip(chip: string): void {
    this._deselectChip.emit(chip);
  }
}
