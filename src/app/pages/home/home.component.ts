import { Component, OnInit } from '@angular/core';
import { AlgorithmicSystemsCardsComponent } from './components/algorithmic-systems-cards/algorithmic-systems-cards.component';
import { TopicCardsComponent } from './components/topic-cards/topic-cards.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    AlgorithmicSystemsCardsComponent,
    TopicCardsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
