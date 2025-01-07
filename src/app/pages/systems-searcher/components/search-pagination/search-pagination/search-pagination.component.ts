import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pagination.component.html',
  styleUrl: './search-pagination.component.scss',
})
export class SearchPaginationComponent implements OnInit {
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

  ngOnInit(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
}
