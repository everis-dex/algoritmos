import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicCardComponent } from '../../../../shared/topic-card/topic-card.component';
import { ITopic } from '../../../../interfaces/topics';
import { Subscription } from 'rxjs';
import { TopicsService } from '../../../../services/topics.service';

@Component({
  selector: 'app-topic-cards',
  standalone: true,
  imports: [TopicCardComponent],
  templateUrl: './topic-cards.component.html',
  styleUrl: './topic-cards.component.scss',
})
export class TopicCardsComponent implements OnInit, OnDestroy {
  public topics: ITopic[] = [];

  private _componentSubscription!: Subscription;

  constructor(private readonly _topicsService: TopicsService) {}

  ngOnInit(): void {
    this._componentSubscription = this._topicsService
      .getTopics()
      .subscribe((response) => {
        this.topics = response;
      });
  }

  ngOnDestroy(): void {
    if (this._componentSubscription) this._componentSubscription.unsubscribe();
  }
}
