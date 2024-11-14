import { TestBed } from '@angular/core/testing';

import { FieldContentService } from './field-content.service';
import { mockFieldContents } from '../mocks/field-contents';

describe('FieldContentService', () => {
  let service: FieldContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFieldContent', () => {
    it('should return an observable of Record<string, string[]>', (done: DoneFn) => {
      const result$ = service.getFieldContent();
      result$.subscribe((data) => {
        expect(data).toEqual(mockFieldContents);
        done();
      });
    });
  });
});
