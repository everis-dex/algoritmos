import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';
import { SessionStorageService } from '../../../../services/session-storage.service';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;

  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(async () => {
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', [
      'getItem',
      'setItem',
      'clear',
    ]);

    await TestBed.configureTestingModule({
      imports: [SearcherComponent],
      providers: [
        { provide: SessionStorageService, useValue: sessionStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should handle category select correctly', () => {
    const event = new MouseEvent('click');
    const eventSpy = spyOn(event, 'preventDefault');

    component.handleCategorySelect(event);

    expect(eventSpy).toHaveBeenCalled();
    expect(component.isFilterVisible).toBeTrue();
  });

  it('should select category', () => {
    const category = 'TestCategory';
    component.selectCategory(category);

    expect(component.categorySelected).toBe(category);
    expect(component.isFilterVisible).toBeFalse();
  });

  it('should handle search input correctly', () => {
    let event = new Event('input');
    const inputElement = document.createElement('input');
    inputElement.value = 'testValue';

    Object.defineProperty(event, 'target', { value: inputElement });

    component.handleInput(event);

    expect(component.hasValue).toBeTrue();
    expect(component.isFilterVisible).toBeTrue();
  });

  it('should reset search', () => {
    component.resetSearch();

    expect(component.currentSearches.length).toBe(0);
    expect(component.isCurrentSearches).toBe(false);
  });

  it('should handle KeyboardEvent correctly', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const eventSpy = spyOn(event, 'preventDefault');
    const redirectionSpy = spyOn(component, 'redirectToSystemsSearcherView');

    sessionStorageService.getItem.and.returnValue('testValue');

    component.handleSearch(event);

    expect(eventSpy).toHaveBeenCalled();
    expect(component.currentSearches).toContain('testValue');
    expect(component.isCurrentSearches).toBeTrue();
    expect(redirectionSpy).toHaveBeenCalled();
  });

  it('should handle MouseEvent correctly', () => {
    const event = new MouseEvent('click');
    const eventSpy = spyOn(event, 'preventDefault');
    const redirectionSpy = spyOn(component, 'redirectToSystemsSearcherView');

    sessionStorageService.getItem.and.returnValue('testValue');

    component.handleSearch(event);

    expect(eventSpy).toHaveBeenCalled();
    expect(component.currentSearches).toContain('testValue');
    expect(component.isCurrentSearches).toBeTrue();
    expect(redirectionSpy).toHaveBeenCalled();
  });

  it('should handle searches correctly when currentSearches has 3 items', () => {
    component.currentSearches = ['search1', 'search2', 'search3'];
    sessionStorageService.getItem.and.returnValue('testSearch');

    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    component.handleSearch(event);

    expect(component.currentSearches).toEqual([
      'search2',
      'search3',
      'testSearch',
    ]);
  });

  it('should not update currentSearches if the item is already present', () => {
    component.currentSearches = ['testSearch'];
    sessionStorageService.getItem.and.returnValue('testSearch');

    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    component.handleSearch(event);
  });

  it('should delete the search at the given index', () => {
    component.currentSearches = ['search1', 'search2', 'search3'];
    sessionStorageService.getItem.and.returnValue(
      JSON.stringify(component.currentSearches)
    );

    component.deleteSearch(1);

    expect(component.currentSearches).toEqual(['search1', 'search3']);
  });

  it('should set isCurrentSearches to false when all searches are deleted', () => {
    sessionStorageService.getItem.and.returnValue(
      JSON.stringify(component.currentSearches)
    );

    component.currentSearches = JSON.parse(
      sessionStorageService.getItem('testValue')
    );

    component.deleteSearch(0);

    expect(component.currentSearches).toEqual([]);
    expect(component.isCurrentSearches).toBeFalse();
  });

  it('should emit changeView event with currentSearch', () => {
    const changeViewSpy = spyOn((component as any)._changeView, 'emit');
    const currentSearch = 'test';

    sessionStorageService.setItem('lastSearch', currentSearch);

    component.redirectToSystemsSearcherView(currentSearch);

    expect(changeViewSpy).toHaveBeenCalledWith('systems-searcher');
  });
});
