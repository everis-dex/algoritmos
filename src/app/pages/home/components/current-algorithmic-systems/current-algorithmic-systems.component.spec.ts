import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAlgorithmicSystemsComponent } from './current-algorithmic-systems.component';

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

  it('should apply the highest element height after window resize', () => {
    const setMaxHeightSpy = spyOn(component, 'setMaxHeightForElements');

    component.onResize();

    expect(setMaxHeightSpy).toHaveBeenCalled();
  });

  it('should emit changeView event to the given view', () => {
    const changeViewSpy = spyOn(component['_changeView'], 'emit');

    const view = 'system-detail';
    component.changeView(view);

    expect(changeViewSpy).toHaveBeenCalledWith(view);
  });

  it('should emit setHeader event to the given algorithmic system id', () => {
    const setHeaderSpy = spyOn(component['_setHeader'], 'emit');

    component.setHeader(component.algorithmicSystems[0].id);

    expect(setHeaderSpy).toHaveBeenCalledWith(
      component.algorithmicSystems[0].title
    );
  });
});
