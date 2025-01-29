import { Component, Input } from '@angular/core';
import { ITopic } from '../../interfaces/topics';
import { normalized } from '../utilities';
@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss',
})
export class TopicCardComponent {
  @Input()
  public topic!: ITopic;

  public normalized = normalized;
}
