import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDataComponent } from './tabs-data.component';
import { TABS_DATA } from './tabs-data.config';
import { provideHttpClient } from '@angular/common/http';
import { mockAlgorithms } from '../../../../shared/mock/algorithms.mock';

describe('TabsDataComponent', () => {
  let component: TabsDataComponent;
  let fixture: ComponentFixture<TabsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsDataComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onresize', () => {
    it('should get tabs height correctly', () => {
      const setMarginTopSpy = spyOn(component['_setMarginTop'], 'emit');
      const tabsContainer = fixture.nativeElement.querySelector(
        '.tabs-data-container__tabs'
      );

      component.onResize();

      expect(setMarginTopSpy).toHaveBeenCalledWith(tabsContainer.offsetHeight);
    });
  });

  describe('getTabs', () => {
    it('should get tabs correctly', () => {
      const tabData = TABS_DATA[0];
      const tabsResult = component.getTabs(tabData);
      expect(tabsResult).toEqual(tabData.tab);
    });
  });

  describe('setTabFields', () => {
    it('should set tab fields correctly', () => {
      component.algorithm = mockAlgorithms[0];
      const mockAlgorithm: Record<string, string> = {
        'Intervenció o vinculació del sistema respecte a una política pública':
          component.algorithm.politica_publica,
        "Avaluació de l'execució":
          component.algorithm.avaluacio_execucio_sistema,
      };

      const tabIndex = 5;
      const tabFieldsResult = component.setTabFields(tabIndex);

      tabFieldsResult.forEach(
        (field) => (field.content = mockAlgorithm[field.field])
      );
      expect(tabFieldsResult).toEqual(component.tabsData[tabIndex].fields);
    });
  });
});
