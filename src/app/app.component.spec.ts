import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set currentView to the given view', () => {
    const view = 'systems-searcher';
    component.changeView(view);

    expect(component.currentView).toBe(view);
  });

  it('should set currentView to the default view', () => {
    component.changeView();

    expect(component.currentView).toBe('home');
  });

  it('should set algorithmicSystemName to the given name', () => {
    const name = 'Anonimitzador de documents';
    component.setHeader(name);

    expect(component.algorithmicSystemName).toBe(name);
  });
});
