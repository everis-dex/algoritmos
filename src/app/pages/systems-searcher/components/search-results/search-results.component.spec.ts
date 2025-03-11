import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return singular result message when one result found', () => {
    component.totalSearchResultsLength = 1;

    const result = component.getResultsFound();
    expect(result).toBe(
      'S\'ha trobat<span class="search-results__bold">1</span> resultat'
    );
  });

  it('should return plural result message when multiple results found', () => {
    component.totalSearchResultsLength = 5;

    const result = component.getResultsFound();
    expect(result).toBe(
      'S\'han trobat<span class="search-results__bold">5</span> resultats'
    );
  });
});
