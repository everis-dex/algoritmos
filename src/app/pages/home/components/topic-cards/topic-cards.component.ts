import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { TopicCardComponent } from '../../../../shared/topic-card/topic-card.component';
import { TopicCard } from '../../../../interfaces/cards';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../services/card.service';
import { TranslationService } from '../../../../services/translation.service';
import { CommonModule } from '@angular/common';
import { getLiterals } from '../../../../shared/utilities';

@Component({
  selector: 'app-topic-cards',
  standalone: true,
  imports: [TopicCardComponent, CommonModule],
  templateUrl: './topic-cards.component.html',
  styleUrl: './topic-cards.component.scss',
})
export class TopicCardsComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  public topics: TopicCard[] = [];

  private readonly _componentSubscriptions: Subscription[] = [];
  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(
    private readonly _topicsService: CardService,
    private readonly _translationService: TranslationService
  ) {}

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
    this._topicsService.getTopics().subscribe((response) => {
      this.topics = response;
    });
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
