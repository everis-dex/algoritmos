import { Component, Input } from '@angular/core';
import { ViewManagerService } from '../../services/view-manager.service';

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
  public algorithmName = '';

  constructor(private readonly _viewManagerService: ViewManagerService) {}

  public redirectToHomeView(event: Event): void {
    event.preventDefault();
    this._viewManagerService.setView('home');
  }
}
