import { Component, EventEmitter, Output } from '@angular/core';
import { SearcherComponent } from './components/searcher/searcher.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearcherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Output()
  private readonly _changeView = new EventEmitter<string>();

  public changeView(view: string): void {
    this._changeView.emit(view);
  }
}
