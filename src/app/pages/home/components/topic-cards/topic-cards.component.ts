import { Component } from '@angular/core';
import { TopicCardComponent } from '../../../../shared/topic-card/topic-card.component';
import { topics } from '../../../../shared/topic-card/topic-card.config';

@Component({
  selector: 'app-topic-cards',
  standalone: true,
  imports: [TopicCardComponent],
  templateUrl: './topic-cards.component.html',
  styleUrl: './topic-cards.component.scss',
})
export class TopicCardsComponent {
  public topics = topics;
}
