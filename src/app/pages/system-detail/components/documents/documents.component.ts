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

  private readonly _componentSubscriptions: Subscription[] = [];
  private _translatedLiterals: Record<string, string> = {};

  constructor(
    private readonly _documentsService: DocumentService,
    private readonly _translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
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

  public getTranslatedText(key: string): string {
    this._translationService.storeLiterals(key);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
