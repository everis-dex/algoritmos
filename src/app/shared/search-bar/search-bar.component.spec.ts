import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { SessionStorageService } from '../../services/session-storage.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(async () => {
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', [
      'getItem',
      'setItem',
      'clear',
    ]);

    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [
        { provide: SessionStorageService, useValue: sessionStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.hasFilterSelector = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onResize', () => {
    it('should update isDesktop when window is resized', () => {
      const checkBreakpointSpy = spyOn(component, 'checkBreakpoint');

      component.onResize();

      expect(checkBreakpointSpy).toHaveBeenCalled();
    });
  });

  describe('onClickOutside', () => {
    it('should hide the filter when clicking outside the category button and searcher container', () => {
      const categoryButton = document.createElement('button');
      categoryButton.classList.add('searcher-container__category-button');
      document.body.appendChild(categoryButton);
      const searcherContainer = document.createElement('section');
      searcherContainer.classList.add('searcher-container__filter');
      document.body.appendChild(searcherContainer);

      const event = new MouseEvent('click');
      document.dispatchEvent(event);
      component.onClickOutside(event);

      expect(component.isFilterVisible).toBeFalse();
    });
  });

  describe('handleCategorySelect', () => {
    it('should handle category select correctly', () => {
      component.handleCategorySelect();

      expect(component.isFilterVisible).toBeTrue();
    });
  });

  describe('selectCategory', () => {
    it('should select category', () => {
      const category = 'TestCategory';
      component.selectCategory(category);

      expect(component.categorySelected).toBe(category);
      expect(component.isFilterVisible).toBeFalse();
    });
  });

  describe('handleInput', () => {
    it('should handle search input correctly', () => {
      const event = new Event('input');
      const inputElement = document.createElement('input');
      inputElement.value = 'testValue';

      Object.defineProperty(event, 'target', { value: inputElement });

      component.handleInput(event);

      expect(component.hasInputValue).toBeTrue();
      expect(component.isFilterVisible).toBeTrue();
    });
  });

  describe('resetSearch', () => {
    it('should reset search', () => {
      component.resetSearch();

      expect(component.currentSearches.length).toBe(0);
    });
  });

  describe('handleSearch', () => {
    it('should handle KeyboardEvent correctly', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const eventSpy = spyOn(event, 'preventDefault');
      const redirectionSpy = spyOn(component, 'redirectToSystemsSearcherView');

      sessionStorageService.getItem.and.returnValue('testValue');

      component.handleSearch(event);

      expect(eventSpy).toHaveBeenCalled();
      expect(component.currentSearches).toContain('testValue');
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
      expect(redirectionSpy).toHaveBeenCalled();
    });

    it('should handle searches correctly when currentSearches has 5 items', () => {
      component.currentSearches = [
        'search1',
        'search2',
        'search3',
        'search4',
        'search5',
      ];
      sessionStorageService.getItem.and.returnValue('search6');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.handleSearch(event);

      expect(component.currentSearches).toEqual([
        'search2',
        'search3',
        'search4',
        'search5',
        'search6',
      ]);
    });

    it('should not update currentSearches if the item is already present', () => {
      component.currentSearches = ['testSearch'];
      sessionStorageService.getItem.and.returnValue('testSearch');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.handleSearch(event);
    });
  });

  describe('deleteSearch', () => {
    it('should delete the search at the given index', () => {
      component.currentSearches = ['search1', 'search2', 'search3'];
      sessionStorageService.getItem.and.returnValue(component.currentSearches);

      component.deleteSearch(1);

      expect(component.currentSearches).toEqual(['search1', 'search3']);
    });

    it('should set isCurrentSearches to false when all searches are deleted', () => {
      component.currentSearches = ['search1'];
      sessionStorageService.getItem.and.returnValue(component.currentSearches);

      component.deleteSearch(0);

      expect(component.currentSearches).toEqual([]);
    });
  });

  describe('redirectToSystemsSearcherView', () => {
    it('should redirect to systems searcher view with currentSearch', () => {
      const viewManagerSpy = spyOn(component['_viewManagerService'], 'setView');
      const currentSearch = 'test';

      sessionStorageService.setItem('lastSearch', currentSearch);

      component.redirectToSystemsSearcherView({ currentSearch });

      expect(viewManagerSpy).toHaveBeenCalledWith('systems-searcher');
    });
  });
});
