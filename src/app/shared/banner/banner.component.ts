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

  private _window!: Window;

  public redirectToIniciPage(): void {
    this._window.location.href =
      'https://administraciodigital.gencat.cat/ca/inici/';
  }

  public redirectToHomeView(): void {
    this._changeView.emit();
  }
}
