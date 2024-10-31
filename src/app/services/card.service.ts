import { Injectable } from '@angular/core';
import { AlgorithmicSystemCard, TopicCard } from '../interfaces/cards';
import { Observable, of } from 'rxjs';
import { mockAlgorithmicSystems, mockTopics } from '../mocks/cards';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public algorithmicSystems: AlgorithmicSystemCard[] = []; // ? para qué
  public topicCards: TopicCard[] = [];

  public getAlgorithmicSystems(): Observable<AlgorithmicSystemCard[]> {
    // mockAlgorithmicSystems.forEach((algorithmicSystem) => {
    //   this.algorithmicSystems.push(algorithmicSystem);
    // });
    return of(mockAlgorithmicSystems);
  }

  public getTopics(): Observable<TopicCard[]> {
    mockTopics.forEach((topicCard) => {
      this.topicCards.push(topicCard);
    });
    return of(this.topicCards);
  }
}
