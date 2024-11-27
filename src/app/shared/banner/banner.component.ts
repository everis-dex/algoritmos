import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
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

  public redirectToHomeView(event: Event): void {
    event.preventDefault();
    this._changeView.emit();
  }
}
