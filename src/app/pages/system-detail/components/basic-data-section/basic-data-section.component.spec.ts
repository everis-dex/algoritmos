import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataSectionComponent } from './basic-data-section.component';

describe('BasicDataSectionComponent', () => {
  let component: BasicDataSectionComponent;
  let fixture: ComponentFixture<BasicDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDataSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
