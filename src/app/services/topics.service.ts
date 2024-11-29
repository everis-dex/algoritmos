import { Injectable } from '@angular/core';
import { ITopic } from '../interfaces/topics';
import { Observable, of } from 'rxjs';
import { mockTopics } from '../mocks/topics';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  public getTopics(): Observable<ITopic[]> {
    return of(mockTopics);
  }
}
