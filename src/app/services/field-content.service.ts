import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockFieldContents } from '../mocks/field-contents';

@Injectable({
  providedIn: 'root',
})
export class FieldContentService {
  public getFieldContent(): Observable<Record<string, string[]>> {
    return of(mockFieldContents);
  }
}
