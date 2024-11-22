import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { getLiterals } from '../../../../../shared/utilities';
import { TranslationService } from '../../../../../services/translation.service';

@Component({
  selector: 'app-search-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pagination.component.html',
  styleUrl: './search-pagination.component.scss',
})
export class SearchPaginationComponent implements OnInit, AfterViewChecked {
  @Input()
  public totalPages!: number;

  @Output()
  private readonly _changePage = new EventEmitter<number>();

  public pages: number[] = [];
  public pageSelected = {
    isFirst: true,
    isMiddle: false,
    isLast: false,
  };
  public currentPage = 1;

  private readonly _literals: Record<string, string> = {};
  private _translatedLiterals: Record<string, string> = {};
  private readonly _getLiterals = getLiterals;

  constructor(private readonly _translationService: TranslationService) {}

  ngOnInit(): void {
    this._translatedLiterals = this._translationService.getTranslatedLiterals();
    this._getTotalPages();
  }

  ngAfterViewChecked(): void {
    if (Object.values(this._literals).length > 0)
      this._translationService.storeLiterals(this._literals);
  }

  private _getTotalPages(): number[] {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    return this.pages;
  }

  public handlePage(page: number): void {
    this.currentPage = page;
    this._changePage.emit(this.currentPage);
    this.pageSelected = {
      isFirst: page === 1,
      isMiddle: page !== 1,
      isLast: page === this.totalPages,
    };
  }

  public handlePreviousPage(initialPage?: number): void {
    this.currentPage = initialPage ?? this.currentPage - 1;
    this._changePage.emit(this.currentPage);
    this.pageSelected = {
      isFirst: this.currentPage === 1,
      isMiddle: this.currentPage !== 1,
      isLast: false,
    };
  }

  public handleNextPage(lastPage?: number): void {
    this.currentPage = lastPage ?? this.currentPage + 1;
    this._changePage.emit(this.currentPage);
    this.pageSelected = {
      isFirst: false,
      isMiddle: this.currentPage !== this.totalPages,
      isLast: this.currentPage === this.totalPages,
    };
  }

  public getTranslatedText(key: string): string {
    const literal = this._translationService.getLiteral(key);
    this._getLiterals(key, literal, this._literals);
    if (this._translatedLiterals) return this._translatedLiterals[key];
    return '';
  }
}
