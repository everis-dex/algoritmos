import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDataComponent } from './tabs-data.component';
import { tabsData } from './tabs-data.config';
import { provideHttpClient } from '@angular/common/http';

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
});
