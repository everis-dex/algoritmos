import { Component } from '@angular/core';
import { ViewManagerService } from '../../services/view-manager.service';

@Component({
  selector: 'app-systems-searcher-link',
  standalone: true,
  imports: [],
  templateUrl: './systems-searcher-link.component.html',
  styleUrl: './systems-searcher-link.component.scss',
})
export class SystemsSearcherLinkComponent {
  constructor(private readonly _viewManagerService: ViewManagerService) {}
  
  public redirectToSystemsSearcherView(): void {
    this._viewManagerService.setView('systems-searcher');
  }
}
