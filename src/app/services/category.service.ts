import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockCategories } from '../mocks/categories';
import { Category } from '../interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categoryList: Category[] = [];

  public getCategories(): Observable<Category[]> {
    mockCategories.forEach((category) => {
      this.categoryList.push(category);
    });
    return of(this.categoryList);
  }
}
