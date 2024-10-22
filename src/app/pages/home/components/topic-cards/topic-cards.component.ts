import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicCardComponent } from '../../../../shared/topic-card/topic-card.component';
import { TopicCard } from '../../../../interfaces/cards';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../services/card.service';

@Component({
  selector: 'app-topic-cards',
  standalone: true,
  imports: [TopicCardComponent],
  templateUrl: './topic-cards.component.html',
  styleUrl: './topic-cards.component.scss',
})
export class TopicCardsComponent implements OnInit, OnDestroy {
  public topics: TopicCard[] = [];

  private _topicsSuscription!: Subscription;

  constructor(private readonly _topicsService: CardService) {}

  ngOnInit(): void {
    this._topicsSuscription = this._topicsService
      .getTopics()
      .subscribe((response) => {
        this.topics = response;
      });
  }

  ngOnDestroy(): void {
    if (this._topicsSuscription) this._topicsSuscription.unsubscribe();
  }
}
