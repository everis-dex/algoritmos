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

  it('should emit changeView event to the given view', () => {
    const changeViewSpy = spyOn(component['_changeView'], 'emit');

    const view = 'system-detail';
    component.changeView(view);

    expect(changeViewSpy).toHaveBeenCalledWith(view);
  });

  it('should emit setHeader event to the given algorithmic system name', () => {
    const setHeaderSpy = spyOn(component['_setHeader'], 'emit');

    const algorithmicSystemName = 'Anonimitzador de documents';
    component.setHeader(algorithmicSystemName);

    expect(setHeaderSpy).toHaveBeenCalledWith(algorithmicSystemName);
  });
});
