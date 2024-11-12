import { Component, Input } from '@angular/core';
import { TopicCard } from '../../interfaces/cards';
@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss',
})
export class TopicCardComponent {
  @Input()
  public topic!: TopicCard;
}
