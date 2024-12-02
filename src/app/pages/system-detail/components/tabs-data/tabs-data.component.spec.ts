import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDataComponent } from './tabs-data.component';
import { tabsData } from './tabs-data.config';
import { provideHttpClient } from '@angular/common/http';
import { mockAlgorithms } from '../../../../mocks/algorithms';

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
      const tabData = tabsData[0];
      const tabsResult = component.getTabs(tabData);
      expect(tabsResult).toEqual(tabData.tab);
    });
  });

  describe('setTabFields', () => {
    it('should set tab fields correctly', () => {
      component.algorithm = mockAlgorithms[0];
      const mockAlgorithm: Record<string, string> = {
        'Nivell de risc': component.algorithm.nivell_de_risc,
        "Forma d'adquisició": component.algorithm.forma_adquisicio,
        'Font de finançament': component.algorithm.font_financament,
        'Desenvolupador': component.algorithm.desenvolupador,
        'Unitat responsable': component.algorithm.unitat_responsable,
        'Tema': component.algorithm.tema,
        'Declarat com actuació administrativa automatizada':
          component.algorithm.actuacio_administrativa_automatitzada,
        'Política pública on intervé el sistema':
          component.algorithm.politica_publica,
        "Data d'entrada": component.algorithm.data_posada_produccio,
        "Data de l'última modificació":
          component.algorithm.data_ultima_modificacio,
        'Motiu de la motificació': component.algorithm.motiu_modificacio,
        'Data de desmantellament': component.algorithm.data_retirada,
      };

      const tabIndex = 0;
      const tabFieldsResult = component.setTabFields(tabIndex);

      tabFieldsResult.forEach(
        (field) => (field.content = mockAlgorithm[field.field])
      );
      expect(tabFieldsResult).toEqual(component.tabsData[tabIndex].fields);
    });
  });
});
