import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDataFieldComponent } from './tab-data-field.component';

describe('TabDataFieldComponent', () => {
  let component: TabDataFieldComponent;
  let fixture: ComponentFixture<TabDataFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabDataFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabDataFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
