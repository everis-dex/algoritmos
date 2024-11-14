import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFieldDataComponent } from './tab-field-data.component';
import { tabsData } from '../../pages/system-detail/components/tabs-data/tabs-data.config';

describe('TabFieldDataComponent', () => {
  let component: TabFieldDataComponent;
  let fixture: ComponentFixture<TabFieldDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabFieldDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabFieldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.field = {
      ...component.field,
      description: {
        text: tabsData[0].fields[0].description?.text ?? '',
        isVisible: tabsData[0].fields[0]?.description?.isVisible ?? false,
      },
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleFieldDescription', () => {
    it('should toggle the visibility of the field description', () => {
      component.toggleFieldDescription();

      expect(component.field.description?.isVisible).toBeTrue();
    });
  });
});
