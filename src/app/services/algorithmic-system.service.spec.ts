import { TestBed } from '@angular/core/testing';

import { AlgorithmicSystemService } from './algorithmic-system.service';
import { mockAlgorithmicSystems } from '../mocks/algorithmic-systems';

describe('AlgorithmicSystemService', () => {
  let service: AlgorithmicSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmicSystemService);
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
});
