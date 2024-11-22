import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';
import { IDocument } from './documents.model';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../../services/translation.service';
import { getLiterals } from '../../../../shared/utilities';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit, OnDestroy, AfterViewChecked {
  public documents: IDocument[] = [];

  private readonly _componentSubscriptions: Subscription[] = [];
  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

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

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
