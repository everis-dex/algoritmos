import { TestBed } from '@angular/core/testing';

import { AlgorithmicSystemService } from './algorithmic-system.service';

describe('AlgorithmicSystemService', () => {
  let service: AlgorithmicSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmicSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
