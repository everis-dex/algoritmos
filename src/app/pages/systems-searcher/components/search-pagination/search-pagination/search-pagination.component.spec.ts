import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPaginationComponent } from './search-pagination.component';

describe('SearchPaginationComponent', () => {
  let component: SearchPaginationComponent;
  let fixture: ComponentFixture<SearchPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPaginationComponent], // Cambié 'imports' por 'declarations'
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.totalPages = 3;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the current page and emit event when handlePage is called', () => {
    const changePageSpy = spyOn(component['_changePage'], 'emit');

    const page = 2;
    component.handlePage(page);

    expect(component.currentPage).toBe(page);
    expect(changePageSpy).toHaveBeenCalled();
    expect(component.pageSelected).toEqual({
      isFirst: false,
      isMiddle: true,
      isLast: false,
    });
  });

  it('should not change the current page when handlePreviousPage is called on the first page', () => {
    const changePageSpy = spyOn(component['_changePage'], 'emit');

    const initialPage = 1;
    component.handlePreviousPage(initialPage);

    expect(component.currentPage).toBe(initialPage);
    expect(changePageSpy).toHaveBeenCalled();
    expect(component.pageSelected).toEqual({
      isFirst: true,
      isMiddle: false,
      isLast: false,
    });
  });

  it('should decrease the current page when handlePreviousPage is called and not on the first page', () => {
    const changePageSpy = spyOn(component['_changePage'], 'emit');
    const initialPage = 3;
    component.currentPage = initialPage;

    component.handlePreviousPage();

    expect(component.currentPage).toBe(initialPage - 1);
    expect(changePageSpy).toHaveBeenCalled();
    expect(component.pageSelected).toEqual({
      isFirst: false,
      isMiddle: true,
      isLast: false,
    });
  });

  it('should not change the current page when handleNextPage is called on the last page', () => {
    const changePageSpy = spyOn(component['_changePage'], 'emit');

    const lastPage = 3;
    component.handleNextPage(lastPage);

    expect(component.currentPage).toBe(lastPage);
    expect(changePageSpy).toHaveBeenCalled();
    expect(component.pageSelected).toEqual({
      isFirst: false,
      isMiddle: false,
      isLast: true,
    });
  });

  it('should increment the current page when handleNextPage is called and not on the last page', () => {
    const changePageSpy = spyOn(component['_changePage'], 'emit');
    const initialPage = 1;
    component.currentPage = initialPage;

    component.handleNextPage();

    expect(component.currentPage).toBe(initialPage + 1);
    expect(changePageSpy).toHaveBeenCalled();
    expect(component.pageSelected).toEqual({
      isFirst: false,
      isMiddle: true,
      isLast: false,
    });
  });
});
