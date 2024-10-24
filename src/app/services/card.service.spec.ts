import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import { mockAlgorithmicSystems, mockTopics } from '../mocks/cards';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of AlgorithmicSystemCard[]', (done: DoneFn) => {
    const result$ = service.getAlgorithmicSystems();
    result$.subscribe((data) => {
      expect(data).toEqual(mockAlgorithmicSystems);
      done();
    });
  });

  it('should return an observable of TopicCard[]', (done: DoneFn) => {
    const result$ = service.getTopics();
    result$.subscribe((data) => {
      expect(data).toEqual(mockTopics);
      done();
    });
  });
});
