import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input()
  public currentView!: string;
  @Input()
  public algorithmicSystemName!: string;

  @Output()
  private readonly _changeView = new EventEmitter<void>();

  public redirectToHomeView(): void {
    this._changeView.emit();
  }
}
