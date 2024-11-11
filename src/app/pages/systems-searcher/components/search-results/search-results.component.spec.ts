import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { mockAlgorithmicSystems } from '../../../../mocks/cards';

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

  describe('setView', () => {
    it('should emit changeView event to the given view', () => {
      const changeViewSpy = spyOn(component['_changeView'], 'emit');
      const setDetailsSpy = spyOn(component['_setDetails'], 'emit');

      const details = mockAlgorithmicSystems[0];
      component.setView(details);

      expect(changeViewSpy).toHaveBeenCalledWith('system-detail');
      expect(setDetailsSpy).toHaveBeenCalledWith(details);
    });
  });
});
