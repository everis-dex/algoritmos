import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-systems-searcher-link',
  standalone: true,
  imports: [],
  templateUrl: './systems-searcher-link.component.html',
  styleUrl: './systems-searcher-link.component.scss',
})
export class SystemsSearcherLinkComponent {
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  public redirectToSystemsSearcherView(): void {
    this._changeView.emit('systems-searcher');
  }
}
