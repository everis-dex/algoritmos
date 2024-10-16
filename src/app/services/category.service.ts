import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockCategories } from '../mocks/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categoryList: string[] = [];

  public getCategories(): Observable<string[]> {
    mockCategories.forEach((category) => {
      this.categoryList.push(category);
    });
    return of(this.categoryList);
  }
}
