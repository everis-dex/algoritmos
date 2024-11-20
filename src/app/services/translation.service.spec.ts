import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import { provideHttpClient } from '@angular/common/http';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
