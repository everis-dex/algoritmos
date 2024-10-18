import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicSystemCardComponent } from './algorithmic-system-card.component';

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

  it('should emit changeView and setHeader events', () => {
    const changeViewSpy = spyOn(component['_changeView'], 'emit');
    const setHeaderSpy = spyOn(component['_setHeader'], 'emit');

    const algorithmicSystemId = 1;
    component.redirectToAlgorithmicSystemDetail(algorithmicSystemId);

    expect(changeViewSpy).toHaveBeenCalled();
    expect(setHeaderSpy).toHaveBeenCalledWith(algorithmicSystemId);
  });
});
