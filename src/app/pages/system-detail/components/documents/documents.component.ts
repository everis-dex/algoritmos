import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { IDocument } from './documents.model';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit, OnDestroy {
  public documents: IDocument[] = [];
  public translatedLiterals: Record<string, string> = {};

  private readonly _componentSubscriptions: Subscription[] = [];

  constructor(
    private readonly _documentsService: DocumentService,
    private readonly _translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translatedLiterals = this._translationService.getTranslatedLiterals();
    this._documentsService
      .getDocuments()
      .subscribe((documents: IDocument[]) => {
        this.documents = documents;
      });
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
