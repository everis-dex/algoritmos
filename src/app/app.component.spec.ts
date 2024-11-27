import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mockAlgorithmicSystems } from './mocks/cards';
import { AlgorithmsRegistryService } from './services/algorithms-registry.service';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: []
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

  describe('changeView', () => {
    it('should set currentView to the given view', () => {
      const view = 'systems-searcher';
      component.changeView(view);

      expect(component.currentView).toBe(view);
    });

    it('should set currentView to the default view', () => {
      component.changeView();

      expect(component.currentView).toBe('home');
    });
  });

  describe('setDetails', () => {
    it('should set algorithmicSystemDetails to the given details', () => {
      const details = mockAlgorithmicSystems[0];
      component.setDetails(details);

      expect(component.algorithmicSystemDetails).toEqual(details);
    });
  });
});
