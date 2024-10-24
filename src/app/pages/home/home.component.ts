import { Component, EventEmitter, Output } from '@angular/core';
import { SearcherComponent } from './components/searcher/searcher.component';
import { AlgorithmicSystemCard } from '../../interfaces/cards';
import { CurrentAlgorithmicSystemsComponent } from './components/current-algorithmic-systems/current-algorithmic-systems.component';
import { TopicCardsComponent } from './components/topic-cards/topic-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearcherComponent,
    CurrentAlgorithmicSystemsComponent,
    TopicCardsComponent,
  ],
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
