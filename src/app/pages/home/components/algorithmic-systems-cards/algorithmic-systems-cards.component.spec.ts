import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicSystemsCardsComponent } from './algorithmic-systems-cards.component';
import { provideHttpClient } from '@angular/common/http';

describe('AlgorithmicSystemsCardsComponent', () => {
  let component: AlgorithmicSystemsCardsComponent;
  let fixture: ComponentFixture<AlgorithmicSystemsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmicSystemsCardsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlgorithmicSystemsCardsComponent);
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
});
