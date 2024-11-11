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
    it('should emit changeView event to the given view', () => {
      const changeViewSpy = spyOn(component['_changeView'], 'emit');
      const setDetailsSpy = spyOn(component['_setDetails'], 'emit');

      const details = mockAlgorithmicSystems[0];
      component.setView(details);

      expect(changeViewSpy).toHaveBeenCalledWith('system-detail');
      expect(setDetailsSpy).toHaveBeenCalledWith(details);
    });
  });

  describe('setHeader', () => {
    it('should emit setHeader event to the given algorithmic system id', () => {
      const setHeaderSpy = spyOn(component['_setHeader'], 'emit');

      component.setHeader(component.algorithmicSystems[0].id);

      expect(setHeaderSpy).toHaveBeenCalledWith(
        component.algorithmicSystems[0].title
      );
    });
  });
});
