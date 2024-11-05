import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { AlgorithmicSystemCard } from '../../../../interfaces/cards';

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

  it('should emit view change when changeView is called', () => {
    const viewSpy = spyOn(component['_changeView'], 'emit');
    const testView = 'testView';

    component.changeView(testView);

    expect(viewSpy).toHaveBeenCalledWith(testView);
  });

  it('should emit algorithm name when getAlgorithmID is called', () => {
    const headerSpy = spyOn(component['_setHeader'], 'emit');
    const mockResults: AlgorithmicSystemCard[] = [
      {
        id: 1,
        title: 'Test Algorithm',
        state: 'active',
        description: 'Test Description',
        categoryChip: 'Test Category',
      },
    ];
    component.searchResults = mockResults;

    component.getAlgorithmID(1);

    expect(headerSpy).toHaveBeenCalledWith('Test Algorithm');
  });

  it('should initialize with empty search results', () => {
    expect(component.searchResults).toEqual([]);
  });

  it('should handle getAlgorithmID with non-existent ID', () => {
    const headerSpy = spyOn(component['_setHeader'], 'emit');
    const mockResults: AlgorithmicSystemCard[] = [
      {
        id: 1,
        title: 'Test Algorithm',
        state: 'active',
        description: 'Test Description',
        categoryChip: 'Test Category',
      },
    ];
    component.searchResults = mockResults;

    component.getAlgorithmID(999);

    expect(headerSpy).toHaveBeenCalledWith('');
  });
});
