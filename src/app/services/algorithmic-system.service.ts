import { Injectable } from '@angular/core';
import { AlgorithmicSystemCard, TopicCard } from '../interfaces/algorithmicSystems';
import { Observable, of } from 'rxjs';
import { mockAlgorithmicSystems, mockTopics } from '../mocks/algorithmic-systems';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmicSystemService {
  public algorithmicSystems: AlgorithmicSystemCard[] = [];
  public topicCards: TopicCard[] = [];

  public getAlgorithmicSystems(): Observable<AlgorithmicSystemCard[]> {
    mockAlgorithmicSystems.forEach((algorithmicSystem) => {
      this.algorithmicSystems.push(algorithmicSystem);
    });
    return of(this.algorithmicSystems);
  }

  public getTopics(): Observable<TopicCard[]> {
    mockTopics.forEach((topicCard) => {
      this.topicCards.push(topicCard);
    });
    return of(this.topicCards);
  }
}
