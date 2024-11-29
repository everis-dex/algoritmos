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

  it('should unsubscribe from all subscriptions on destroy', () => {
    const subscriptionSpy = jasmine.createSpyObj('Subscription', [
      'unsubscribe',
    ]);
    component['_componentSubscriptions'] = [subscriptionSpy];

    component.ngOnDestroy();

    expect(subscriptionSpy.unsubscribe).toHaveBeenCalled();
  });

  describe('changePage', () => {
    it('should change the page and scroll the window to the top', () => {
      const windowSpy = spyOn(window, 'scrollTo');

      const page = 2;
      component.changePage(page);

      expect(windowSpy).toHaveBeenCalled();
    });
  });

  describe('filtersApplied', () => {
    it('should update filter list correctly', () => {
      const updatedFilterList = [
        { filter: 'Filter 1', optionsSelected: ['Option 1', 'Option 2'] },
        { filter: 'Filter 2', optionsSelected: ['Option 3'] },
        { filter: 'Filter 3', optionsSelected: [] },
      ];
      component.filtersApplied(updatedFilterList);

      expect(component.filterList).toEqual(updatedFilterList);
    });
  });
});
