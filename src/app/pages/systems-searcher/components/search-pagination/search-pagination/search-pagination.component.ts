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
    this._getTotalPages();
  }

  private _getTotalPages(): number[] {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    return this.pages;
  }

  public handlePage(page: number): void {
    this.pageSelected = {
      isFirst: page === 1,
      isMiddle: page !== 1 && page !== this.totalPages,
      isLast: page === this.totalPages,
    };

    this.currentPage = page;
    this._changePage.emit(this.currentPage);
  }

  public handlePreviousPage(initialPage?: number): void {
    if (initialPage) {
      this.currentPage = initialPage;
    } else if (this.currentPage !== 1) {
      this.currentPage--;
    }

    this._changePage.emit(this.currentPage);
    this.pageSelected = {
      isFirst: this.currentPage === 1,
      isMiddle: this.currentPage !== 1,
      isLast: false,
    };
  }

  public handleNextPage(lastPage?: number): void {
    if (lastPage) {
      this.currentPage = lastPage;
    } else if (this.currentPage !== this.totalPages) {
      this.currentPage++;
    }

    this._changePage.emit(this.currentPage);
    this.pageSelected = {
      isFirst: false,
      isMiddle: this.currentPage !== this.totalPages,
      isLast: this.currentPage === this.totalPages,
    };
  }
}
