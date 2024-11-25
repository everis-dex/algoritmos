import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicCardComponent } from '../../../../shared/topic-card/topic-card.component';
import { TopicCard } from '../../../../interfaces/cards';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../services/card.service';
import { TranslationService } from '../../../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-cards',
  standalone: true,
  imports: [TopicCardComponent, CommonModule],
  templateUrl: './topic-cards.component.html',
  styleUrl: './topic-cards.component.scss',
})
export class TopicCardsComponent implements OnInit, OnDestroy {
  public topics: TopicCard[] = [];
  public translatedLiterals: Record<string, string> = {};

  private _componentSubscription!: Subscription;

  constructor(
    private readonly _topicsService: CardService,
    private readonly _translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
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
