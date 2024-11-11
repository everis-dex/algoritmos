import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlgorithmicSystemCard } from '../../interfaces/cards';
import { CurrentAlgorithmicSystemsComponent } from './components/current-algorithmic-systems/current-algorithmic-systems.component';
import { TopicCardsComponent } from './components/topic-cards/topic-cards.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    CurrentAlgorithmicSystemsComponent,
    TopicCardsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @Output()
  private readonly _changeView = new EventEmitter<string>();
  @Output()
  private readonly _setDetails = new EventEmitter<AlgorithmicSystemCard>();
  @Output()
  private readonly _setHeader = new EventEmitter<string>();

  public algorithmicSystems: AlgorithmicSystemCard[] = [];

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  public changeView(view: string): void {
    this._changeView.emit(view);
  }

  public setDetails(details: AlgorithmicSystemCard): void {
    this._setDetails.emit(details);
  }

  public setHeader(name: string): void {
    this._setHeader.emit(name);
  }
}
