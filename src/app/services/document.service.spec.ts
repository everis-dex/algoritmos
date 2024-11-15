import { TestBed } from '@angular/core/testing';

import { DocumentService } from './document.service';
import { mockDocuments } from '../mocks/documents';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDocuments', () => {
    it('should return an observable of IDocument[]', (done: DoneFn) => {
      const result$ = service.getDocuments();
      result$.subscribe((data) => {
        expect(data).toEqual(mockDocuments);
        done();
      });
    });
  });
});
