import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAlgorithmicSystemsComponent } from './current-algorithmic-systems.component';
import { mockAlgorithmicSystems } from '../../../../mocks/cards';

describe('CurrentAlgorithmicSystemsComponent', () => {
  let component: CurrentAlgorithmicSystemsComponent;
  let fixture: ComponentFixture<CurrentAlgorithmicSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAlgorithmicSystemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentAlgorithmicSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onResize', () => {
    it('should apply the highest element height after window resize', () => {
      const setMaxHeightSpy = spyOn(component, 'setMaxHeightForElements');

      component.onResize();

      expect(setMaxHeightSpy).toHaveBeenCalled();
    });
  });

  describe('setView', () => {
    it('should emit changeView event when argument is a string', () => {
      const changeViewSpy = spyOn(component['_changeView'], 'emit');

      const view = 'systems-searcher';
      component.setView(view);

      expect(changeViewSpy).toHaveBeenCalledWith(view);
    });

    it('should emit changeView event when argument is an object', () => {
      const changeViewSpy = spyOn(component['_changeView'], 'emit');
      const setDetailsSpy = spyOn(component['_setDetails'], 'emit');

      const details = mockAlgorithmicSystems[0];
      component.setView(details);

      expect(changeViewSpy).toHaveBeenCalledWith('system-detail');
      expect(setDetailsSpy).toHaveBeenCalledWith(details);
    });
  });
});
