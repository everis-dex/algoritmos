import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsSearcherComponent } from './systems-searcher.component';
import { provideHttpClient } from '@angular/common/http';

describe('SystemsSearcherComponent', () => {
  let component: SystemsSearcherComponent;
  let fixture: ComponentFixture<SystemsSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsSearcherComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions on destroy', () => {
      const subscriptionSpy = jasmine.createSpyObj('Subscription', [
        'unsubscribe',
      ]);
      component['_componentSubscriptions'] = [subscriptionSpy];

      component.ngOnDestroy();

      expect(subscriptionSpy.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('changePage', () => {
    it('should change the page and scroll the window to the top', () => {
      const windowSpy = spyOn(window, 'scrollTo');

      const page = 2;
      component.changePage(page);

      expect(windowSpy).toHaveBeenCalled();
    });
  });

  describe('getSearch', () => {
    it('should call session storage and algorithms service with valid filters and session search value', () => {
      const getItemSpy = spyOn(
        component['_sessionStorageService'],
        'getItem'
      ).and.returnValue('testSearch');
      const onCombinedSearchSpy = spyOn(
        component['_algorithmsRegistryService'],
        'onCombinedSearch'
      ).and.returnValue([]);

      const updatedFilterList = [
        { name: 'tema', chipsSelected: ['tema1'] },
        { name: 'etiquetes', chipsSelected: ['etiqueta1', 'etiqueta2'] },
        { name: 'estat', chipsSelected: ['estat1'] },
        { name: 'tipus_sistema', chipsSelected: ['sistema1'] },
      ];
      component.getSearch(updatedFilterList);

      expect(getItemSpy).toHaveBeenCalledWith('lastSearch');
      expect(onCombinedSearchSpy).toHaveBeenCalledWith('testSearch', {
        tema: 'tema1',
        etiquetes: 'etiqueta1,etiqueta2',
        estat: 'estat1',
        tipus_sistema: 'sistema1',
      });
      expect(component.searchResults).toEqual([]);
    });

    it('should call session storage and algorithms service with valid filters and no session search value', () => {
      const getItemSpy = spyOn(
        component['_sessionStorageService'],
        'getItem'
      ).and.returnValue(undefined);

      const updatedFilterList = [
        { name: 'tema', chipsSelected: ['tema1'] },
        { name: 'etiquetes', chipsSelected: ['etiqueta1', 'etiqueta2'] },
        { name: 'estat', chipsSelected: ['estat1'] },
        { name: 'tipus_sistema', chipsSelected: ['sistema1'] },
      ];
      component.getSearch(updatedFilterList);

      expect(getItemSpy).toHaveBeenCalledWith('lastSearch');
    });
  });
});
