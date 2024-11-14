import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicSystemCardComponent } from './algorithmic-system-card.component';
import { mockAlgorithmicSystems } from '../../mocks/cards';

describe('AlgorithmicSystemCardComponent', () => {
  let component: AlgorithmicSystemCardComponent;
  let fixture: ComponentFixture<AlgorithmicSystemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmicSystemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlgorithmicSystemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('redirectToAlgorithmicSystemDetails', () => {
    it('should emit changeView event to the given algorithmic system', () => {
      const changeViewSpy = spyOn(component['_changeView'], 'emit');

      const event = new MouseEvent('click');
      const algorithmicSystem = mockAlgorithmicSystems[0];
      component.redirectToAlgorithmicSystemDetails(event, algorithmicSystem);

      expect(changeViewSpy).toHaveBeenCalledWith(algorithmicSystem);
    });
  });
});
