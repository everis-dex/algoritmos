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

  it('should emit changeView event when the current view is systems-searcher', () => {
    const changeViewSpy = spyOn((component as any)._changeView, 'emit');
    const currentView = 'systems-searcher';

    component.changeView(currentView);

    expect(changeViewSpy).toHaveBeenCalledWith(currentView);
  });
});
