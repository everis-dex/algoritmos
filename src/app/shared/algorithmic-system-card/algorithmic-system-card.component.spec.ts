import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicSystemCardComponent } from './algorithmic-system-card.component';
import { mockAlgorithms } from '../../mocks/algorithms';
import { provideHttpClient } from '@angular/common/http';

describe('AlgorithmicSystemCardComponent', () => {
  let component: AlgorithmicSystemCardComponent;
  let fixture: ComponentFixture<AlgorithmicSystemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmicSystemCardComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlgorithmicSystemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('redirectToSystemDetailView', () => {
    it('should redirect to system detail view to the given algorithmic system', () => {
      const viewManagerSpy = spyOn(component['_viewManagerService'], 'setView');

      const event = new MouseEvent('click');
      const algorithmicSystem = mockAlgorithms[0];
      component.redirectToSystemDetailView(event, algorithmicSystem);

      expect(viewManagerSpy).toHaveBeenCalledWith('system-detail');
    });
  });
});
