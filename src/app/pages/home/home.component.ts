import { Component, EventEmitter, Output } from '@angular/core';
import { SearcherComponent } from './components/searcher/searcher.component';
import { AlgorithmicSystemCard } from '../../interfaces/algorithmicSystems';
import { CurrentAlgorithmicSystemsComponent } from './components/current-algorithmic-systems/current-algorithmic-systems.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearcherComponent, CurrentAlgorithmicSystemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setHeader = new EventEmitter<string>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  public changeView(view: string): void {
    this._changeView.emit(view);
  }

  public setHeader(name: string): void {
    this._setHeader.emit(name);
  }
}
