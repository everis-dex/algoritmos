import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDocument } from '../pages/system-detail/components/documents/documents.model';
import { mockDocuments } from '../mocks/documents';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public getDocuments(): Observable<IDocument[]> {
    return of(mockDocuments);
  }
}
