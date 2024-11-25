import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDataComponent } from './tabs-data.component';
import { tabsData } from './tabs-data.config';
import { FieldContentService } from '../../../../services/field-content.service';
import { mockFieldContents } from '../../../../mocks/field-contents';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('TabsDataComponent', () => {
  let component: TabsDataComponent;
  let fixture: ComponentFixture<TabsDataComponent>;

  let fieldContentService: jasmine.SpyObj<FieldContentService>;

  beforeEach(async () => {
    fieldContentService = jasmine.createSpyObj('FieldContentService', [
      'getFieldContent',
    ]);

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
      expect(tabsResult).toEqual(component.translatedLiterals[tabData.tab]);
    });
  });

  describe('setTabFields', () => {
    it('should get tab fields correctly', () => {
      fieldContentService.getFieldContent.and.returnValue(
        of(mockFieldContents)
      );
      const windowSpy = spyOn(window, 'scrollTo');

      const index = 2;
      const expectedTabFieldsData = Object.values(mockFieldContents)[index];
      const tabFieldsResult = component.setTabFields(index);

      expect(windowSpy).toHaveBeenCalled();
      expect(component.currentTabIndex).toBe(index);
      expect(
        component.tabsData[index].fields.map((field) => field.content)
      ).toEqual(expectedTabFieldsData);
      expect(tabFieldsResult).toEqual(component.tabsData[index].fields);
    });
  });
});
