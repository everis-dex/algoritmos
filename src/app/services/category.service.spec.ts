import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { mockCategories } from '../mocks/categories';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of string[]', (done: DoneFn) => {
    const result$ = service.getCategories();
    result$.subscribe((data) => {
      expect(data).toEqual(mockCategories);
      done();
    });
  });
});
