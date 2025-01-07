import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicSystemsCardsComponent } from './algorithmic-systems-cards.component';
import { provideHttpClient } from '@angular/common/http';
import { AlgorithmsRegistryService } from '../../../../services/algorithms-registry.service';
import { of } from 'rxjs';

describe('AlgorithmicSystemsCardsComponent', () => {
  let component: AlgorithmicSystemsCardsComponent;
  let fixture: ComponentFixture<AlgorithmicSystemsCardsComponent>;
  let mockAlgorithmsRegistryService: jasmine.SpyObj<AlgorithmsRegistryService>;

  beforeEach(async () => {
    mockAlgorithmsRegistryService = jasmine.createSpyObj(
      'AlgorithmsRegistryService',
      ['getAlgorithmsSubject']
    );

    await TestBed.configureTestingModule({
      imports: [AlgorithmicSystemsCardsComponent],
      providers: [
        provideHttpClient(),
        {
          provide: AlgorithmsRegistryService,
          useValue: mockAlgorithmsRegistryService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlgorithmicSystemsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should filter, sort, and slice algorithms on ngOnInit', () => {
      component.algorithms = [
        { ...component.algorithms[0], data_ultima_modificacio: '2023-01-01' },
        { ...component.algorithms[1], data_ultima_modificacio: '12/12/2022' },
        { ...component.algorithms[2], data_ultima_modificacio: '03/03/2023' },
        { ...component.algorithms[3], data_ultima_modificacio: '15/01/2023' },
        { ...component.algorithms[4], data_ultima_modificacio: '08/02/2023' },
      ];

      const expectedData = [
        { ...component.algorithms[0], data_ultima_modificacio: '03/03/2023' },
        { ...component.algorithms[1], data_ultima_modificacio: '08/02/2023' },
        { ...component.algorithms[2], data_ultima_modificacio: '15/01/2023' },
        { ...component.algorithms[3], data_ultima_modificacio: '2023-01-01' },
      ];

      mockAlgorithmsRegistryService.getAlgorithmsSubject.and.returnValue(
        of(component.algorithms)
      );

      component.ngOnInit();

      expect(
        mockAlgorithmsRegistryService.getAlgorithmsSubject
      ).toHaveBeenCalled();
      expect(component.algorithms).toEqual(expectedData.slice(0, 4));
    });
  });

  describe('onResize', () => {
    it('should apply the highest element height after window resize', () => {
      const setMaxHeightSpy = spyOn(component, 'setMaxHeightForElements');

      component.onResize();

      expect(setMaxHeightSpy).toHaveBeenCalled();
    });
  });
});
