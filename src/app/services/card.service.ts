import { Injectable } from '@angular/core';
import { AlgorithmicSystemCard, TopicCard } from '../interfaces/cards';
import { Observable, of } from 'rxjs';
import { mockAlgorithmicSystems, mockTopics } from '../mocks/cards';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public getAlgorithmicSystems(): Observable<AlgorithmicSystemCard[]> {
    return of(mockAlgorithmicSystems);
  }

  public getTopics(): Observable<TopicCard[]> {
    return of(mockTopics);
  }
}
