import { TestBed } from '@angular/core/testing';

import { TopicsService } from './topics.service';
import { mockTopics } from '../mocks/topics';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of TopicCard[]', (done: DoneFn) => {
    const result$ = service.getTopics();
    result$.subscribe((data) => {
      expect(data).toEqual(mockTopics);
      done();
    });
  });
});
