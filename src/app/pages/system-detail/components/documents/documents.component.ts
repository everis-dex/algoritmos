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

  private _componentSubscription!: Subscription;

  constructor(private readonly _documentsService: DocumentService) {}

  // ToDo reemplazar servicio por Input de algoritmo y mostrar sus fitxers (serán máximo 10). Backend en desarrollo.

  ngOnInit(): void {
    this._componentSubscription = this._documentsService
      .getDocuments()
      .subscribe((documents: IDocument[]) => {
        this.documents = documents;
      });
  }

  ngOnDestroy(): void {
    if (this._componentSubscription) this._componentSubscription.unsubscribe();
  }
}
