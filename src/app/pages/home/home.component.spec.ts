import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeView event when the current view is system-detail', () => {
    const changeViewSpy = spyOn(component, 'changeView');
    const currentView = 'system-detail';

    component.redirectToAlgorithmicSystemDetail();

    expect(changeViewSpy).toHaveBeenCalledWith(currentView);
  });

  it('should emit setHedder event when the algorithmic system id is called', () => {
    const setHeaderSpy = spyOn(component['_setHeader'], 'emit');

    component.redirectToAlgorithmicSystemDetail(
      component.algorithmicSystems[0].id
    );

    expect(setHeaderSpy).toHaveBeenCalledWith(
      component.algorithmicSystems[0].title
    );
  });
});
