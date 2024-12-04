import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockCategories } from '../mocks/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public getCategories(): Observable<string[]> {
    return of(mockCategories);
  }
}
