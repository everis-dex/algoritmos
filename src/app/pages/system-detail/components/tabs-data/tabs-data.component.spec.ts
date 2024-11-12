import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDataComponent } from './tabs-data.component';

describe('TabsDataComponent', () => {
  let component: TabsDataComponent;
  let fixture: ComponentFixture<TabsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
