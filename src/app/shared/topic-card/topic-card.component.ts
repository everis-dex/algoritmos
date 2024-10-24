import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss',
})
export class TopicCardComponent {
  @Input()
  public image!: string;
  @Input()
  public title!: string;
  @Input()
  public description!: string;
  @Input()
  public url!: string;
}
