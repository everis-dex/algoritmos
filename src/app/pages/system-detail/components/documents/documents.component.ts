import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { IDocument } from './documents.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit, OnDestroy {
  public documents: IDocument[] = [];

  private _documentsSuscription!: Subscription;

  constructor(private readonly _documentsService: DocumentService) {}

  ngOnInit(): void {
    this._documentsSuscription = this._documentsService
      .getDocuments()
      .subscribe((documents: IDocument[]) => {
        this.documents = documents;
      });
  }

  ngOnDestroy(): void {
    if (this._documentsSuscription) this._documentsSuscription.unsubscribe();
  }
}
