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
  private readonly _translationLiterals: Record<string, string> = {};
  private _translatedTexts: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(
    private readonly _topicsService: CardService,
    private readonly _translationService: TranslationService
  ) {}

  ngAfterViewChecked(): void {
    if (Object.values(this._translationLiterals).length > 0)
      this._translationService.saveLiterals(this._translationLiterals);
  }

  ngOnInit(): void {
    this._translatedTexts = this._translationService.getTranslations();
    this._topicsService.getTopics().subscribe((response) => {
      this.topics = response;
    });
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  public getTranslatedText(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const literal = this._translationService.getLiteral(key, params);
    this._getLiterals(key, literal, this._translationLiterals);
    if (this._translatedTexts) return this._translatedTexts[key];
    return '';
  }
}
